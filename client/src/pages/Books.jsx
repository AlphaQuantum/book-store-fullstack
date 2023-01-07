import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/index.css'

export default function Books() {
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
            <header className=' bg-slate-200 top-0 m-0 left-0 ml-0 w-100 p-1'>
                <div className='text-3xl text-center antialiased font-bold leading-normal'>My Book Shop</div>
            </header>
            <div className="grid grid-cols-12">
                <div className="col-span-2 bg-slate-300">
                    <button className="p-1 shadow bg-cyan-600 text-cyan-100"><Link to="/add">Add new book</Link></button>
                </div>

                <div className="col-span-10 pt-14 grid grid-cols-12 items-stretch justify-items-center gap-4">
                    {books.map(book => (
                        <div className="font-mono drop-shadow-lg w-56 shadow-lg border border-slate-400 col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3" key={book.id}>
                            {//If the book.cover is truthy then renders this, if not then doesnt render the img
                                book.cover && <img src={book.cover} alt="" />
                            }
                            <div className="p-2 flex flex-col text-center">
                                <h2 className='font-bold  text-lg '>{book.title}</h2>
                                <p className='text-justify truncate'>{book.desc}</p>
                                <span className='text-red-800'>{book.price}$</span>
                                <button onClick={() => handleDelete(book.id)} className="p-1 shadow bg-red-600 text-red-100">Delete</button>
                                <button className="p-1 shadow bg-cyan-600 text-cyan-100"><Link to={`/update/${book.id}`} >Update</Link></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </>
    )
}
