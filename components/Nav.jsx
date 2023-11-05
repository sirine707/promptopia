"use client"
import React from 'react'
import { useEffect,useState} from 'react'
import Link from 'next/link';
import Image from 'next/image';
import {signIn,signOut,useSession,getProviders} from 'next-auth/react'
const Nav = () => {
    const {data:session}=useSession();
    const [providers,setProviders]=useState(null);
    const [toggleDropDown, settoggleDropDown] = useState(false);
    useEffect(()=>{
        const setupProviders=async()=>{
            const response=await getProviders();
            setProviders(response)
        }
        setupProviders();
    },[])
  return (
    <nav className='w-full flex flex-between mb-16 pt-3 '>
        
            <Link
            href={"/"}
            className='flex gap-2 flex-center'>
            <Image
            src='/assets/images/logo.svg'
            alt='promptopia logo'
            width={30}
            height={30}
            className='object-contain'/>
            <p className='logo_text'>Promptopia</p>
            </Link>
            {/*desktop navigation */}
            <div className='sm:flex hidden'>
                {session?.user?(
                    <div className='flex gap-3 md:gap-5'>
                        <Link href="/create-prompt"
                    className='black_btn'>
                        create prompt
                    </Link>
                    <button type='button'
                    className='outline_btn'
                    onClick={signOut}>
                        Sign Out
                    </button>
                    <Link href="/profile">
                        <Image
                        src={session?.user.image}
                        alt='profile picture'
                        width={40}
                        height={40}
                        className='rounded-full'/>
                    </Link>
                    </div>
                ):(
                    <>
                    {providers && Object.values(providers).map((provider)=>(
                    <button type='button'
                    key={provider.name}
                    onClick={()=>signIn(provider.id)}
                    className='black_btn'>
                        Sign In
                    </button>
                    ))}

                    </>
                )}
                

            </div>
            {/*mobile navigation */}
            <div className='sm:hidden flex relative'>
            {session?.user?(
                    <div className='flex '>
                        <Image
                        src={session?.user.image}
                        alt='profile picture'
                        width={30}
                        height={30}
                        className='rounded-full'
                        onClick={()=>{settoggleDropDown((prev)=>!prev)}}/>
                        {toggleDropDown && (
                            <>
                            <div className='dropdown'>
                                <Link href="/profile"
                                className='dropdown_link'
                                onClick={()=>settoggleDropDown(false)}>
                                Profile
                                </Link>
                                <Link href="/create-prompt"
                                className='dropdown_link'
                                onClick={()=>settoggleDropDown(false)}>
                                create prompt
                                </Link>
                                <button
                                type='button'
                                onClick={() => {
                                setToggleDropdown(false);
                                signOut();
                                }}
                                className='mt-5 w-full black_btn'
                                >
                                Sign Out
                                </button>
                            </div>
                            </>
                        )}

                    
                    </div>
                ):(
                    <>
                    {providers && Object.values(providers).map((provider)=>(
                    <button type='button'
                    key={provider.name}
                    onClick={()=>signIn(provider.id)}
                    className='black_btn'>
                        Sign In
                    </button>
                    ))}

                    </>
                )}

            </div>

        

    </nav>
  )
}

export default Nav
