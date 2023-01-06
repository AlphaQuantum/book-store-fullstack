import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

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

    return (
        <>
            <div>My Book Shop</div>
            <div className="books">
                {books.map(book=>( 
                    <div className="book" key={book.id}>
                        {//If the book.cover is truthy then renders this, if not then doesnt render the img
                        book.cover && <img src={book.cover} alt=""/>
                        }
                        <h2>{book.title}</h2>
                        <p>{book.desc}</p>
                        <span>{book.price}$</span>
                    </div>
                ))}
            </div>
            <button><Link to="/add">Add new book</Link></button>
        </>
    )
}
