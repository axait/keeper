"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import "@/src/styles/FilterBar.scss";

const FilterBar = () => {
    const pathname = usePathname();
    
    return (
        <li
            className='
            flex justify-evenly items-center
            bg-[#321D64]
            h-[50px]
            my-1.5 mx-1
            rounded 
            '
        >
            <Link
                href="#"
                className={`w-[80px] filter-bar ubuntu-sans-mono
                    ${pathname === '/all' ? 'active-link-styles' : ''}
                    `}
            >All</Link>
            <div
                className="
                    bg-white 
                    h-[30px] w-[1px] 
                    mx-4
                    opacity-50
                    "
            ></div>
            <Link 
                href="#"
                className={`filter-bar ubuntu-sans-mono
                    ${pathname === '/not-completed' ? 'active-link-styles' : ''}
                    `}
            >Not Completed</Link>
            <div
                className="
                    bg-white 
                    h-[30px] w-[1px] 
                    mx-4
                    opacity-50
                    "
            ></div>

            <Link
                href="#"
                className={`filter-bar ubuntu-sans-mono
                    ${pathname === '/completed' ? 'active-link-styles' : ''}
                    `}
            >Completed</Link>

            {/* <Link
                href="#"
                className='ml-3 filter-bar'
            >All</Link>
            <div
                className="
                    bg-white 
                    h-[30px] w-[1px] 
                    mx-4
                    opacity-50
                    "
            ></div>
            <Link href="#" >Not Completed</Link>
            <div
                className="
                    bg-white 
                    h-[30px] w-[1px] 
                    mx-4
                    opacity-50
                    "
            ></div>

            <Link href="#" >Completed</Link> */}
        </li>
    )
}

export default FilterBar
