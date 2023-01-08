import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Add() {
    const [book, setBook] = useState({
        title: "",
        price: 0.0,
        desc: "",
        cover: ""
    });

    const navigate = useNavigate();

    //handle input change
    const handleChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    //handle click, more like send data to the database
    const handleClick = async e => {
        //so that doesnt refresh the page
        e.preventDefault();
        try {
            await axios.post("http://localhost:8888/books", book);
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
                <textarea className='p-1 my-2 border shadow' type="text" onChange={handleChange} placeholder='description' name='desc' />
                <input className='p-1 my-2 border shadow' type="text" onChange={handleChange} placeholder='cover' name='cover' />
                <input className='p-1 my-2 border shadow' type="number" onChange={handleChange} placeholder='0.00' name='price' />
                <button className='p-1 shadow bg-cyan-600 text-cyan-100' onClick={handleClick}>Update Book</button>
            </div>
        </div>
    )
}
