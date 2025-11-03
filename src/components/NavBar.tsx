'use client';

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import "@/styles/navbar.scss";
import axios from 'axios';
import { usePathname, useRouter } from "next/navigation";



const NavBar = () => {
    const router = useRouter();
    const pathNanme = usePathname();

    const [isLogined, setIsLogined] = useState<boolean>(false)
    const handleLogOut = async () => {

        const token = document.cookie?.split(';').find(c => c.trim().startsWith('token='));
        if (token) {
            const res = await axios.post('/api/user/signout')
            // console.log(res.data)
            if (res.data?.success) {
                setIsLogined(false)
                localStorage.removeItem('todo-storage')
                router.push('/signin');
            }
        }
    }

    useEffect(() => {
        const exceptionalRoutes=['/signin','/','/404']
        const token = document.cookie?.split(';').find(c => c.trim().startsWith('token='));
        if (token) {
            setIsLogined(true);
        } else {
            setIsLogined(false);
            if (!exceptionalRoutes.includes(window.location.pathname)) {
                router.push('/signin');
            }
        }
    }, [pathNanme, router])

    useEffect(() => {
        const token = document.cookie?.split(';').find(c => c.trim().startsWith('token='));
        // console.log("token: ", token)
        if (token) {
            setIsLogined(true);
        }
    }, [])

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
                        {
                            !isLogined ?
                                <Link href="/signin" className='irish-grover-regular text-sm'>Signin</Link>
                                :
                                <div
                                    className='
                                flex flex-row
                                '
                                >
                                    <a
                                        href="https://github.com/axait/keeper"
                                        className='
                                            irish-grover-regular text-sm
                                            flex flex-row items-center
                                            my-1 mx-0
                                            hover:text-gray-300
                                            '
                                    >
                                        <Image src="/github-brands-solid-full.svg"
                                            className='ml-20'
                                            alt="avatar" width={25} height={25} />
                                        <span
                                            className='text-sm ml-[2px]'
                                        >
                                            @axait
                                        </span>
                                    </a>
                                    <span
                                        className='
                                            irish-grover-regular text-sm
                                            flex flex-row items-center
                                            my-1 ml-2
                                            cursor-pointer
                                            hover:text-gray-300
                                            '
                                        onClick={handleLogOut}
                                    >
                                        Logout
                                    </span>
                                </div>
                        }
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar
