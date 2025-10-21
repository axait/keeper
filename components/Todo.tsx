"use client";

import React from 'react'
import "@/styles/Todo.scss";


const Todo = () => {
    return (
        <>
            <li
                className='
                bg-gray-700
                h-[50px]
                my-1.5 mx-1
                rounded 
                '
            >
                <input type="checkbox" name="todo" id=""
                className='
                rounded-lg
                '
                 />
                hello
            </li>
        </>
    )
}

export default Todo
