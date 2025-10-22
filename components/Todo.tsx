"use client";

import React from 'react'
import "@/styles/Todo.scss";


function Todo({title, description, date, time, status}:{
    title: string,
    description: string,
    date: string,
    time: string,
    status: "not-completed"|"completed",}) {
    return (
        <>
        {/* COMPLETE TODO FOR DETAIL KEEPER */}
            <li
                className='
                bg-[#1a1a1a]
                h-[50px]
                my-1.5 mx-1
                rounded 
                flex items-center
                todo-complete-displayer
                '
            >
                <label
                    className="
                form-control
                ml-2 md:ml-3
                ">
                    <input type="checkbox" name="checkbox"
                        className='
                        '
                    />
                </label>

                <span
                    className='
                    font-sans
                    text-sm md:text-base
                    ml-2
                    '
                >Lorem ipsum dolor sit amet consectetur adipisicing </span>

            </li>
        </>
    )
}

export default Todo
