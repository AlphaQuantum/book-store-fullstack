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
    const [count, setCount] = useState(0);

    const navigate = useNavigate();

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
        try {
            await axios.post("http://localhost:8888/books", book);
            //redirects to home page
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="pt-14 w-full sm:w-2/4 mx-auto m-2">
            <div className="flex flex-col p-1">
                <input className='p-1 my-2 border shadow' type="text" onChange={handleChange} placeholder='Title' name='title' />
                <textarea className='p-1 my-2 border shadow' type="text" onChange={handleChange} placeholder='Description' name='desc' />
                {count > 1848 ?
                    <div className='text-red-700'><span className='float-right'>{count}/2048</span></div> : <div className='text-yellow-900'><span className='float-right'>{count}/2048</span></div>
                }
                <input className='p-1 my-2 border shadow' type="text" onChange={handleChange} placeholder='Cover link' name='cover' />
                <input className='p-1 my-2 border shadow' type="number" onChange={handleChange} placeholder='0.00' name='price' />
                <button className='p-1 shadow bg-yellow-700 text-white' onClick={handleClick}>Update Book</button>
            </div>
        </div>
    )
}
