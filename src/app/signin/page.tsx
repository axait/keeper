"use client";

import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';


const Signin = () => {
    const router = useRouter();

    const [isSignIn, setIsSignIn] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        if (!isSignIn) {
            const res = await axios.post('/api/user/create', JSON.stringify({ name, email, password }))
            if (res.data?.success) {
                setIsSignIn(true)
                setErrorMessage("Successfully SignUp. Now, LogIn Please")
            }
        } else {
            const res = await axios.post('/api/user/signin', JSON.stringify({ email, password }))
            console.log(res.data)
            if (res.data?.success) {
                setTimeout(() => {
                    router.push('/todo');
                }, 1000)
            }
        }
    }

    return (
        <>
            <div className="signin-container flex flex-col justify-center items-center h-screen ">
                <form onSubmit={handleSubmit}
                    className='
                    flex flex-col justify-evenly items-center
                    border-4 border-[#6239c9]
                    rounded-md
                    min-h-[450px] w-[400px]
                    font-mono
                    p-4
                    '
                >
                    <h1
                        style={{
                            borderBottom: '4px solid #6239c9'
                        }}
                    >
                        {
                            isSignIn ? 'Lets start!' : 'Join Us!'
                        }
                    </h1>
                    {/* --------------nameField----------------- */}
                    {!isSignIn &&
                        <div className="
                        flex flex-col
                        w-[98%]
                        ">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" placeholder='name' onChange={(e) => setName(e.target.value)}
                                className='
                                font-serif
                                py-2 mx-2
                                h-[40px]
                                outline-none
                                focus:border-b-3 
                                focus:border-[#6239c9]
                                hover:border-b-3
                                hover:border-[#6239c9]                        
                                '
                                style={{
                                    borderBottom: `${name.trim() === '' ? '' : '3px solid #6239c9'}`
                                }}
                            />
                        </div>
                    }
                    {/* --------------emailField----------------- */}
                    <div className="
                        flex flex-col
                        w-[98%]
                        ">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" placeholder='email' onChange={(e) => setEmail(e.target.value)}
                            className='
                            font-serif
                            py-2 mx-2
                            h-[40px]
                            outline-none
                            focus:border-b-3 
                            focus:border-[#6239c9]
                            hover:border-b-3
                            hover:border-[#6239c9]                        
                            '
                            style={{
                                borderBottom: `${email.trim() === '' ? '' : '3px solid #6239c9'}`
                            }}
                        />
                    </div>
                    {/* --------------passwordField----------------- */}
                    <div className="
                        flex flex-col
                        w-[98%]
                        ">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" placeholder='password' onChange={(e) => setPassword(e.target.value)}
                            className='
                            font-serif
                            py-2 mx-2
                            h-[40px]
                            outline-none
                            focus:border-b-3 
                            focus:border-[#6239c9]
                            hover:border-b-3
                            hover:border-[#6239c9]                        
                            '
                            style={{
                                borderBottom: `${password.trim() === '' ? '' : '3px solid #6239c9'}`
                            }}
                        />
                    </div>
                    {/* --------------switcher_Field----------------- */}
                    <div className="
                        text-left text-[0.6rem]
                        w-[100%]
                        pl-1
                    ">
                        Don&apos;t have an account?
                        <span
                            className='ml-2 text-[#c5b1f8] hover:text-[#af94fa] text-[0.65rem]'
                            style={{
                                cursor: 'pointer'
                            }}
                            onClick={() => { setIsSignIn(!isSignIn) }}
                        >
                            {isSignIn ? 'SignUp' : 'Login'}
                        </span>
                    </div>
                    {/* ---------ERROR MESSAGE----------- */}
                    <div className="
                        text-left text-[0.6rem]
                        w-[100%]
                        pl-1
                        "
                    >
                        {errorMessage}
                    </div>
                    {/* --------------switcher_Field----------------- */}
                    <button type="submit"
                        className='
                        bg-[#492998]
                        h-[40px] w-[98%]
                        rounded
                        text-white
                        hover:bg-[#24144c]
                        '
                    >
                        {
                            isSignIn ? 'Login' : 'Signin'
                        }
                    </button>
                </form>
            </div>
        </>
    )
}

export default Signin

