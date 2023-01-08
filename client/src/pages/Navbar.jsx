import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
            <ul className='m-0 top-0 p-0 overflow-hidden bg-slate-900 z-50 text-white fixed w-full'>
                
                <li className='float-left'><Link to={"/"} className="block text-center px-5 py-3 hover:bg-slate-800">Home</Link></li>
                <li className='float-left'><Link to={"/add"} className="block text-center py-3 px-5 hover:bg-slate-800">Add New Book</Link></li>
            </ul>
    )
}
