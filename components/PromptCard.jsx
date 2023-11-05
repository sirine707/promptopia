"use client"
import Image from "next/image"
import { useState } from "react"
import { usePathname,useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
const PromptCard = ({post,handleEdit,handleDelete,handleTagClick}) => {
  const router=useRouter()
  const pathName=usePathname()
  const {data:session}=useSession()
  const handleProfileClick=()=>{
    if (session?.user.id===post.creator._id) router.push("/profile")
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`)
  }
  const handleCopy=()=>{
    setcopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(()=>setcopied(""),3000)
  }
  const  [copied, setcopied] = useState("");
  return (
    <>    
    <div className="prompt_card">
    <div className="flex justify-between items-start gap-5">
    <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
    onClick={handleProfileClick}>
      
      <Image
      src={post.creator.image}
      alt="creator photo"
      width={45}
      height={45}
      className="object-contain rounded-full"/>
      
      <div className="flex flex-col">
      <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator.email}
            </p>

      </div>
    </div>

    <div className="copy_btn " onClick={handleCopy}>
      <Image
      src={copied===post.prompt? '/assets/icons/tick.svg'
            : '/assets/icons/copy.svg'} 
      alt={copied===post.prompt? 'tick icons'
            : 'copy icon'}
      width={12}
      height={12} 
      />
    </div>
    </div>
    <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      {
        session?.user.id===post.creator._id && pathName==="/profile" && (
          <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
            <p className="font-inter cursor-pointer text-sm green_gradient" onClick={handleEdit}>
              Edit
            </p>
            <p className="font-inter cursor-pointer text-sm orange_gradient" onClick={handleDelete}>
              delete
            </p>
          </div>
        )}
      
    </div>
    </>
  )
}

export default PromptCard
