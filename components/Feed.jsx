"use client"

import { useState,useEffect } from 'react';
import PromptCard from './PromptCard';
const PromptCardList=({data,handleTagClick})=>{
{/*map over the data and render a Promptcard */}
  return(
    <div className='mt-16 prompt_layout'>
    {data.map((post)=>(
    <PromptCard
    key={post._id}
    post={post}
    handleTagClick={handleTagClick}
    />
  ))}
 
  </div>  
  )
}
const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const  [searchTimeout, setsearchTimeout] = useState(null);
  //search state
  const [searchText, setsearchText] = useState("");
  const  [searchResult, setsearchResult] = useState([]);

  const handleSearchChange=(e)=>{
    clearTimeout(searchTimeout)
    setsearchText(e.target.value)
    //debounce method
    setsearchTimeout(setTimeout(() => {
      const searchedResult=filterprompt(e.target.value)
      setsearchResult(searchedResult)
    }, 500)
    )
    console.log(searchResult)
  }
  
  const filterprompt=(searchText)=>{
    const searchPattern=new RegExp(searchText,"i")
    return allPosts.filter((item)=>
      searchPattern.test(item.creator.username) || 
      searchPattern.test(item.tag) ||
      searchPattern.test(item.prompt)
  )
    
    
  }
  const handleTagClick=(tagName)=>{
    setsearchText(tagName)
    const tagResult=filterprompt(tagName);
    setsearchResult(tagResult)
  }

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
        type='text'
        placeholder='Search for a tag or a username'
        required
        value={searchText}
        onChange={handleSearchChange}
        className='search_input peer'
        />
      </form>
       {/* All Prompts in case search is empty*/}
      {searchText?(
        <PromptCardList
        data={searchResult}
        handleTagClick={handleTagClick}/>
      )
      :(
        
        <PromptCardList
        data={allPosts}
        handleTagClick={handleTagClick}/>
        
      )}
      

    </section>
  )
}

export default Feed
