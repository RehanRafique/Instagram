'use client'
import React, { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { useState } from "react";
import { adPosts, getPosts } from "../config/firebase";
// import gif from '../../Assests/waiting.gif'
export default function Dashboard() {
  const [text, setText] = useState()
  const [img, setImg] = useState()
  const [posted, setPosted] = useState()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, [])

  useEffect(() => {
    getAllPosts()
  }, [posted])

  const getAllPosts = async () => {
    const allPosts = await getPosts()
    setPosted(allPosts)
    console.log(allPosts, 'allposts');
  }


  const adPosted = async () => {
    if (!img || img) {
      await adPosts({
        text, img
      })
    }

  }

  return <>
    <div>
      <nav className="bg-gray-800 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center flex-grow">
            <a className="text-white font-bold text-lg cursor-pointer">Facebook</a>
            <ul className="flex ml-8 space-x-4">
              <li>

                <input className="max-w-screen-xl md:w-64 lg:w-96 xl:w-120 px-4 py-2 rounded-lg bg-gray-200 placeholder-gray-500" placeholder='Search Bar' />

              </li>
              <li>
                <a className="text-gray-300 hover:text-white">Explore</a>
              </li>
              <li>
                <a className="text-gray-300 hover:text-white">Notifications</a>
              </li>
            </ul>
          </div>
          <div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full">Request List</button>
          </div>
        </div>
      </nav>
    </div>
    <div className="w-full flex justify-center mt-5" > <input type='text' className="w-5/6 m-0 p-8 rounded" placeholder='Whats on your Mind! ' onChange={(e) => setText(e.target.value)} /></div>
    <div class="flex justify-center mt-5">
      <div><input type='file' className=" file:mr-4 file:py-2 file:px-4
      file:rounded file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100" onChange={(e) => setImg(e.target.files[0])} /></div>
      <div>   <button class="bg-blue-500 text-white px-4 py-2 rounded-full" onClick={adPosted}>
        POST
      </button></div>
    </div>

    {posted?.map((item) => {
      return <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto mt-5">
        <div className="font-bold text-xl mb-2">Card Title</div>
        <p className="text-gray-700 text-base">{item.text}</p>

        <img className="w-full" src={item.img} alt="Img-not-found" />
        <div className="px-6 py-4">

        </div>
        <div className="px-6 py-4">
          <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">Like</button>
          <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">Comment</button>
          <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">Share</button>
        </div>
      </div>
    })}

  </>

}