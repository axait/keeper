"use client";

import React, { useEffect, useState } from 'react'
import '@/styles/logFiler.scss';

export interface ILogProps {
    _id: string;
    message: string;
    time: string;
    status: "info" | "success" | "error" | "warning" | "errorserious",
    createdAt: Date;
}

const LogFiler = ({ index, log }: { index: string, log: ILogProps }) => {
    const [statusSign, setStatusSign] = useState<string>("")

    // just to ensure if wrong status come then dont get mad
    useEffect(() => {
        switch (log.status) {
            case "info":
                setStatusSign("?")
                break;
            case "success":
                setStatusSign("*")
                break;
            case "error":
                setStatusSign("!")
                break;
            case "warning":
                setStatusSign("_")
                break;
            case "errorserious":
                setStatusSign("!!")
                break;
            default:
                break;
        }
    }, [])


    return (
        <div>
            <li key={index}
                // bg-transparent
                className='
                flex flex-row items-center
                py-[4px]
                '
            >
                <span className='
                text-gray-500
                text-[0.75rem]
                mr-[4px]
                '>
                    {log.time}
                </span>
                <span className={`
                ${(log.status)}
                px-[4px]
                font-light font-mono
                text-sm
                `}>
                    [{statusSign}]
                </span>
                <span className='
                text-[0.9rem]
                font-serif
                ml-2
                '>
                    {log.message}
                </span>
            </li>
        </div>
    )
}

export default LogFiler
