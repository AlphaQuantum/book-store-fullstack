import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Add() {
    const [book, setBook] = useState({
        title:"",
        price:null,
        desc:"",
        cover:""
    });

    const navigate = useNavigate();

    //handle input change
    const handleChange = (e) =>{
        setBook((prev)=>({...prev,[e.target.name]:e.target.value}))
    }

    //handle click, more like send data to the database
    const handleClick = async e =>{
        //so that doesnt refresh the page
        e.preventDefault();
        try{
            await axios.post("http://localhost:8888/books",book);
            //redirects to home page
            navigate("/")
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div className="form">
            <h1>Add New Book</h1>
            <input type="text" onChange={handleChange} placeholder='title' name='title' />
            <input type="text" onChange={handleChange} placeholder='desc' name='desc'/>
            <input type="text" onChange={handleChange} placeholder='cover' name='cover'/>
            <input type="number" onChange={handleChange} placeholder='price' name='price' />
            <button onClick={handleClick}>Add Book</button>
        </div>
    )
}
