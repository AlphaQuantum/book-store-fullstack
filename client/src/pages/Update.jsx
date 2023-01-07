import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Update() {
  const [book, setBook] = useState({
    title: "",
    price: null,
    desc: "",
    cover: ""
  });

  const navigate = useNavigate();
  //to get the book id (from the path)
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];

  //handle input change
  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  //handle click, more like send data to the database
  const handleClick = async e => {
    //so that doesnt refresh the page
    e.preventDefault();
    try {
      await axios.put("http://localhost:8888/books/" + bookId, book);
      //redirects to home page
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="w-full sm:w-2/4 mx-auto m-2">
      <h1 className='text-3xl text-center antialiased font-bold leading-normal'>Update Book</h1>
      <div className="flex flex-col p-1">
        <input className='p-1 my-2 border shadow' type="text" onChange={handleChange} placeholder='title' name='title' />
        <input className='p-1 my-2 border shadow' type="text" onChange={handleChange} placeholder='desc' name='desc' />
        <input className='p-1 my-2 border shadow' type="text" onChange={handleChange} placeholder='cover' name='cover' />
        <input className='p-1 my-2 border shadow' type="number" onChange={handleChange} placeholder='price' name='price' />
        <button className='p-1 shadow bg-cyan-600 text-cyan-100' onClick={handleClick}>Update Book</button>
      </div>
    </div>
  )
}
