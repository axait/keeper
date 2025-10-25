import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import "@/src/styles/navbar.scss";

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
                        <Image src="/github-brands-solid-full.svg" alt="avatar" width={30} height={30} />
                    </li>
                    <li>
                        <a
                            href="https://github.com/axait/"
                            className='irish-grover-regular text-sm'
                        >@axait</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar
