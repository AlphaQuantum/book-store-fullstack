import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/index.css'

export default function Admin() {
    const [books, setBooks] = useState([]);
    //Just fetch all the data from localhost:8888/books
    useEffect(() => {
        //it's async, it must be like this cuz it's an api request
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8888/books")
                console.log(res.data);
                setBooks(res.data);
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllBooks();
    }, [])
    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8888/books/" + id);
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <div className="pt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-stretch mx-4 justify-items-stretch gap-4">
                {books.map(book => (
                    <div className="drop-shadow-lg w-100 shadow-xl border rounded-lg bg-yellow-50" key={book.id}>
                        <div className="p-2 flex flex-col text-center">
                            <h2 className='font-bold text-xl mt-2'>{book.title}</h2>
                            {//If the book.cover is truthy then renders this, if not then doesnt render the img
                                book.cover &&
                                <div className='group flex justify-center'>
                                    <div className="transition ease-in-out absolute top-10 z-20 left-0 w-32 flex flex-col origin-left scale-x-0 group-hover:scale-100">
                                        <button onClick={() => handleDelete(book.id)} className="border border-black/20 rounded-r-lg p-1 pl-0 shadow bg-orange-800 text-white">Delete</button>
                                        <button className="border border-black/20 rounded-r-lg mt-1 p-1 shadow bg-yellow-700 text-white"><Link to={`/update/${book.id}`} >Update</Link></button>
                                    </div>
                                    <img className="m-4 drop-shadow-book border border-black/20" src={book.cover} alt="Error" />
                                </div>
                            }
                            <p className='text-justify line-clamp-3 px-8 my-2'>{book.desc}</p>
                            <span className='text-red-800'>{book.price}$</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )/*<div className="col-span-1 bg-slate-300">
                    <button className="p-1 shadow bg-cyan-600 text-cyan-100"><Link to="/add">Add new book</Link></button>
                </div> */
}
