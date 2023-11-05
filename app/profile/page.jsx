"use client"
import {useState,useEffect} from 'react'
import {useSession} from 'next-auth/react'
import Profile from "@components/Profile"
import { useRouter } from 'next/navigation'
const Myprofile = () => {
    const [posts, setposts] = useState([]);
    const {data:session}=useSession()
    const router=useRouter()
    
    const handleDelete = async (post) => {
      const hasConfirmed = confirm(
        "Are you sure you want to delete this prompt?"
      );
  
      if (hasConfirmed) {
        try {
          await fetch(`/api/prompt/${post._id.toString()}`, {
            method: 'DELETE',
          });
  
          const filteredPosts = posts.filter((item) => item._id !== post._id);
  
          setposts(filteredPosts);
        } catch (error) {
          console.log(error);
        }
      }
    };


    const handleEdit=(post)=>{
      router.push(`/update-prompt?id=${post._id}`)
    };
    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
    
        setposts(data);
      };
    
      useEffect(() => {
        if(session?.user.id){
            fetchPosts();
        }
      }, [session?.user.id]);
    
  return (
    <Profile
    name="My"
    desc="welcome to your Profile Page"
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    />
  )
}

export default Myprofile
