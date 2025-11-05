"use client";

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import axios from 'axios';

const MyFooter = () => {
    const [ip, setIp] = useState<string>("0.0.0.0");

    useEffect(() => {

        axios.get('https://ifconfig.me/ip')
            .then((response) => response.data)
            .then((data: string) => { setIp(data) })

    }, [])


    return (
        <>
        <br />
        <br />
        <br />
            <div
                className='
            flex items-center justify-around
            relative bottom-0
            bg-[#512fa754]
            min-h-[120px] w-full
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

                <Image
                    src="/Keeper.png" alt="avatar"
                    priority
                    width={150} height={100}
                    style={{ height: 'auto', width: 'auto' }} // maintains aspect ratio
                />

                <a
                    href="https://github.com/axait/keeper"
                    className='
                irish-grover-regular text-sm
                flex flex-row items-center
                my-1 mx-0
                '
                >
                    <Image src="/github-brands-solid-full.svg"
                        className='ml-20'
                        alt="avatar" width={25} height={25} />
                    <span
                        className='text-sm font-mono ml-[2px]'
                    >
                        @axait
                    </span>
                </a>
            </div>
        </>
    )
}

export default MyFooter
