import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Update() {
  const [book, setBook] = useState({
    title: "",
    price: 0.0,
    desc: "",
    cover: ""
  });
  const [count, setCount] = useState(0);

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
        setCount(newBook.desc.length);

      } catch (err) {
        console.log(err)
      }
    }
    bookData()
  }, [])


  //handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCount(value.length);
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
    <div className="pt-14 w-full sm:w-2/4 mx-auto m-2">
      <div className="flex flex-col p-1">
        <input className='p-1 my-2 border shadow' type="text" onChange={handleChange} value={book.title} placeholder='title' name='title' />
        <textarea className='p-1 my-2 border shadow' type="text" onChange={handleChange} value={book.desc} placeholder='desc' name='desc' />
        {count > 1848 ? 
        <div className='text-red-700'><span className='float-right'>{count}/2048</span></div> : <div className='text-yellow-900'><span className='float-right'>{count}/2048</span></div>
        }
        <input className='p-1 my-2 border shadow' type="text" onChange={handleChange} value={book.cover} placeholder='cover' name='cover' />
        <input className='p-1 my-2 border shadow' type="number" onChange={handleChange} value={book.price} placeholder='price' name='price' />
        <button className='p-1 shadow bg-yellow-700 text-white' onClick={handleClick}>Update Book</button>
      </div>
    </div>
  )
}
