import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import {connectToDb} from '@utils/database'
import User from '@models/user'
const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async signIn({ profile}) {
          await connectToDb();
          try {
            const userExists=await User.findOne({
                email:profile.email
            });
            if (!userExists) {
                await User.create({
                    email:profile.email,
                    username:profile.name.replace(" ","").toLowerCase(),
                    image:profile.picture
                })
            } 
            return true;
          } catch (error) {
            console.log(error)
            return false;
          }
        },
        async session({ session }) {
          const userSession=await User.findOne({
            email:session.user.email
        });
        session.user.id=userSession._id.toString()
        return session;
        }
    }
})

export {handler as GET, handler as POST}
