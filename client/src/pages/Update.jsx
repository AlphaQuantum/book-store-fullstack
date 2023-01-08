import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Update() {
  const [book, setBook] = useState({
    title: "",
    price: 0,
    desc: "",
    cover: ""
  });

  const navigate = useNavigate();
  //to get the book id (from the path)
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];

  useEffect(() => {
    const bookData = async () => {
      try {
        const res = await axios.get("http://localhost:8888/books/" + bookId)
        const newBook = res.data[0];
        setBook({
          title: newBook.title,
          price: newBook.price,
          desc: newBook.desc,
          cover: newBook.cover
        });

      } catch (err) {
        console.log(err)
      }
    }
    bookData()
  }, [])


  //handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  }
  

  //handle click, more like send data to the database
  const handleClick = async e => {
    //so that doesnt refresh the page
    e.preventDefault();
    console.log(book)
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
        <input className='p-1 my-2 border shadow' type="text" onChange={handleChange} value={book.title} placeholder='title' name='title' />
        <textarea className='p-1 my-2 border shadow' type="text" onChange={handleChange} value={book.desc} placeholder='desc' name='desc' />
        <input className='p-1 my-2 border shadow' type="text" onChange={handleChange} value={book.cover} placeholder='cover' name='cover' />
        <input className='p-1 my-2 border shadow' type="number" onChange={handleChange} value={book.price} placeholder='price' name='price' />
        <button className='p-1 shadow bg-cyan-600 text-cyan-100' onClick={handleClick}>Update Book</button>
      </div>
    </div>
  )
}
