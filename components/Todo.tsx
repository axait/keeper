"use client";

import React from 'react'
import "@/styles/Todo.scss";
import "@/styles/InputField.scss";

export type TodosType = {
    key: number|string,
    title: string,
    description: string,
    date: string,
    time: string,
    status: "InCompleted" | "Completed"
}


function Todo({ key, title, description, date, time, status }:TodosType) {
    return (
        <>
            {/* COMPLETE TODO FOR DETAIL KEEPER */}
            <li
                key={key}
                className='
                bg-[#1a1a1a]
                min-h-[50px]
                my-1.5 mx-1
                rounded 
                flex items-center
                '
            >
                {/* INPUT FIELD */}
                <label
                    className="
                form-control
                ml-2 md:ml-3
                ">
                    <input type="checkbox" name="checkbox" />
                </label>

                {/* STATUS */}
                <div
                    className='
                    ml-2 md:ml-3
                    '
                >
                    <span
                        className='
                        font-sans
                        text-sm md:text-base
                        '
                    >{status}</span>
                </div>

                <span
                    className='
                    font-sans
                    text-sm md:text-base
                    ml-2
                    '
                >{title}</span>

            </li>
        </>
    )
}

export default Todo


{/* <li
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

            </li> */}