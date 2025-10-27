"use client";

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

const MyFooter = () => {
    const [ip, setIp] = useState<string>("0.0.0.0");

    useEffect(() => {
        
        axios.get('https://ifconfig.me/ip')
                .then((response) => response.data)
                .then((data: string) => { setIp(data) })
        
    }, [])
    

    return (
        <div
            className='
            flex items-center justify-around
            absolute bottom-0
            bg-[#512fa754]
            h-[120px] w-full
            translate-y-20
            '
        >
            {!!ip &&
                <span
                    className='
                    text-sm
                    '
                >
                    IP:
                    <span
                        style={{ opacity: '1 !important' }}
                        className='text-yellow-400 font-mono ml-1'
                    >{ip}</span>
                </span>
            }

            <Image src="/Keeper.png" alt="avatar" 
            width={150} height={100} />
            
            <a
                href="https://github.com/axait/keeper"
                className='
                irish-grover-regular text-sm
                flex flex-row items-center
                my-1 mx-0
                '
            >
                <Image src="/github-brands-solid-full.svg" alt="avatar" width={25} height={25} />
                <span
                className='text-sm font-mono ml-[2px]'
                >
                    @axait
                </span>
                </a>
        </div>
    )
}

export default MyFooter


        // <div
        //     className='
        //     flex flex-col items-center justify-center
        //     absolute bottom-0
        //     bg-[#512fa754]
        //     opacity-80
        //     h-fit w-full
        //     pt-[5px]
        //     navbar-active-hover
        //     '
        // >
        //     {!!ip &&
        //         <span
        //             className='
        //             text-sm
        //             '
        //         >
        //             Your Ip is:
        //             <span
        //                 style={{ opacity: '1 !important' }}
        //                 className='text-yellow-400 font-mono ml-1'
        //             >{ip}</span>
        //         </span>
        //     }
        //     <a
        //         href="https://github.com/axait/"
        //         className='
        //         irish-grover-regular text-sm
        //         flex flex-row items-center
        //         my-1
        //         '
        //     >
        //         <Image src="/github-brands-solid-full.svg" alt="avatar" width={25} height={25} />
        //         @axait</a>
        // </div>