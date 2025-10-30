import React from 'react'
import Link from 'next/link';
import "@/styles/navbar.scss";

const NavBar = () => {
    return (
        <div>
            <nav
                // absolute
                className='
                h-[50px] w-[98%]
                flex justify-between items-center
                px-5
                mx-[1%] mt-1 mb-2
                rounded
                bg-[#512fa754]
                opacity-90
                navbar-active-hover
                border-1 border-[#512fa7]
                '
            >
                <h1
                    className='irish-grover-regular'
                ><Link href="/">Keeper</Link></h1>
                <ul
                    className='
                flex gap-1
                '
                >
                    <li>
                        LogIn | profile Badge
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar
