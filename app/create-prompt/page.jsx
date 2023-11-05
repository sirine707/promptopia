"use client"
import { useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';

const page = () => {
  const {data:session}=useSession()
  const [post, setPost] = useState(
    {prompt:"",
    tag:""
    });
  const [submitting, setIsSubmitting] = useState(false);
  const router=useRouter()


  const createPrompt=async(e)=>{
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response =await fetch("/api/prompt/new",{
        method:'POST',
        body:JSON.stringify({
          prompt:post.prompt,
          userId:session?.user.id,
          tag:post.tag
        }),
      })
      if(response.ok){
        router.push("/")
      }

    } catch (error) {
      console.log(error)
    }finally{
      setIsSubmitting(false)
    }
  }
  return (
      <Form
      type="create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt} />
    
  )
}

export default page
