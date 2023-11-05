"use client"
import Profile from "@components/Profile"
import {useState,useEffect} from 'react'
import {useRouter,useSearchParams } from 'next/navigation';
const UserProfile = ({params}) => {
    const SearchName=useSearchParams();
    const profileName=SearchName.get("name")
    const  [userPosts, setuserPosts] = useState([]);
    useEffect(()=>{
        const fetchUserPosts=async()=>{
            const response =await fetch(`/api/users/${params?.id}/posts`)
            const data=await response.json()
            setuserPosts(data)
        }
        fetchUserPosts()
    },[params.id])
  return (
    <Profile
    name={profileName}
    desc={`welcome to ${profileName} Profile Page`}
    data={userPosts}
    />
  )
}

export default UserProfile
