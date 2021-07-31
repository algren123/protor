import { signOut } from 'next-auth/client'
import { useState } from 'react'
import Link from 'next/link'


function Navbar() {

    const [showMenu, setShowMenu] = useState(false);

    return (
        <nav className="flex items-center justify-between flex-wrap bg-light-grey p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6 cursor-pointer">
                <a href="/#" className="font-semibold text-xl tracking-tight text-primary">Protor</a>
            </div>
            <div className="block lg:hidden">
                <button onClick={() => setShowMenu(!showMenu)} className="flex items-center px-3 py-2 bg-primary">
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>
            <div className={(showMenu ? 'block' : 'hidden') + ' w-full flex-grow lg:flex lg:items-center lg:w-auto'}>
                <div className="text-sm lg:flex-grow">
                <a href="/#" className="block mt-4 lg:inline-block lg:mt-0 text-primary hover:text-cadet-blue-50 mr-4">
                    Home
                </a>
                <Link href="/profile">
                    <span className="block mt-4 lg:inline-block lg:mt-0 text-primary hover:text-cadet-blue-50 mr-4 cursor-pointer">Profile</span>
                </Link>
                </div>
                <Link href="/addpost">
                    <span className="inline-block text-sm font-semibold px-4 py-2 bg-primary rounded mt-4 mx-0 lg:mx-3 lg:mt-0 cursor-pointer">Add post</span>
                </Link>
                <div>
                    <button onClick={() => {
                        signOut();
                    }} className="inline-block text-sm font-semibold px-4 py-2 bg-primary rounded mt-4 mx-0 lg:mx-3 lg:mt-0">Logout</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;