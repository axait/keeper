"use client";

import React, { useState } from 'react'
import "@/styles/Todo.scss";
import "@/styles/InputField.scss";
import axios from 'axios';
import { useTodoStore } from '@/store/useTodoStore';
import { fetchTodos } from '@/lib/fetchTodos';


type TodoTypeHere = {
    _id: string,
    title: string,
    description: string,
    createdAt: string | Date,
    isComplete: boolean
}


function Todo({ _id, title, description, createdAt, isComplete }: TodoTypeHere) {

    const [isExpanded, setIsExpanded] = useState(false);
    const { toggleTodo } = useTodoStore();

    const handleTodoToggle = async () => {
        try {
            const updatedTodo = {
                todoId: _id,
                todoName: title,
                todoDescription: description,
                isComplete: !isComplete
            };

            await axios.post('/api/todo/update', JSON.stringify({ ...updatedTodo }));

            toggleTodo(_id); // <-- updates Zustand store directly
        } catch (err) {
            console.error('Failed to toggle todo', err);
        }
    };



    return (
        <>
            {/* COMPLETE TODO FOR DETAIL KEEPER */}
            <li
                key={_id}
                className='
                bg-[#1a1a1a]
                min-h-[50px]
                my-1.5 mx-1 md:px-1
                py-3
                rounded 
                '
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <span>{isExpanded}</span>
                <div className='flex items-center' >
                    {/* INPUT FIELD */}
                    <label
                        className="
                        form-control
                        ml-3
                    ">
                        <input onClick={handleTodoToggle} type="checkbox" name="checkbox" defaultChecked={isComplete} />
                    </label>
                    {/* ---------------- */}

                    {/* -------STATUS_BAR_START----- */}
                    <div
                        className='
                    flex items-center justify-between
                    w-full
                    ml-2 md:ml-3
                    mr-3
                    '
                    >
                        {/* -------STATUS----- */}
                        <span
                            className={`
                        font-sans
                        text-sm md:text-base
                        ${isComplete === false ? "text-[#f61f1f]" : "text-[#18b152]"}
                        `}
                        >{isComplete}</span>

                        {/* -------DATE&TIME_START----- */}
                        <div>
                            <span
                                className="
                            font-mono
                            text-[15px]
                            opacity-50
                            "
                            >{`${createdAt}`}</span>
                        </div>
                        {/* -------DATE&TIME_END----- */}
                    </div>
                </div>
                {/* -------STATUS_BAR_END----- */}

                {/* Bottom Area */}
                <div
                    className='
                        flex flex-col
                        w-[94%]
                        mr-3 ml-3
                        ' >

                    <span
                        className='
                        font-sans
                        my-2
                        arima-regular
                        
                        '
                    >{title}</span>
                    {/* separator */}
                    <div
                        className='
                        h-[1px] w-full
                        bg-white
                        opacity-50
                        '
                    ></div>
                    <span
                        className='
                        tasa-orbiter-regular
                        text-[0.8rem]
                        font-light
                        opacity-70
                        mt-2 mb-1
                        
                        '
                    >{description}</span>

                </div>


                {/* <span
                    className='
                    font-sans
                    text-sm md:text-base
                    ml-2
                    '
                >{title}</span> */}

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