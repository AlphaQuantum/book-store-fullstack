import React from 'react'
import { Link } from 'react-router-dom';

export default function NavbarAdmin() {
    return (
            <ul className='m-0 top-0 p-0 overflow-hidden bg-yellow-800/70 backdrop-blur z-50 text-white fixed w-full'>
                <li className='float-left'><Link to={"/"} className="block text-center px-5 py-3 hover:bg-yellow-900/90">Home</Link></li>
            </ul>
    )
}
