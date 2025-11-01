"use client";

import { useState, useEffect } from 'react';
import LogFiler, { ILogProps } from '@/components/LogFiler';
import axios from 'axios';

const PageLogger = () => {
    const [logs, setLogs] = useState<ILogProps[]>([]);

    const getLogs = async () => {
        const res = await axios.post('/api/logfiler/get', JSON.stringify({ secretCodeForLogs: "helloSecret" }))
        setLogs(res.data?.data)
    }

    useEffect(() => {
        getLogs();

    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full bg-black">
            <h1 className="text-2xl font-serif mb-4">Logs</h1>
            <ul
                className="
                bg-black min-h-screen
                w-[94vw]
                mx-[2vw]
                px-[2vw]
                "
            >
                {!!logs && logs.map((log) => (
                    // eslint-disable-next-line react/jsx-key
                    <LogFiler index={log._id} log={log} />
                ))}
            </ul>
        </div>
    );
};

export default PageLogger;
