"use client";

import React from 'react'
import "@/styles/Todo.scss";
import "@/styles/InputField.scss";

export type TodosType = {
    key: number | string,
    title: string,
    description: string,
    date: string,
    time: string,
    status: "InComplete" | "Completed"
}


function Todo({ key, title, description, date, time, status }: TodosType) {
    return (
        <>
            {/* COMPLETE TODO FOR DETAIL KEEPER */}
            <li
                key={key}
                className='
                bg-[#1a1a1a]
                min-h-[50px]
                my-1.5 mx-1 md:px-1
                py-3
                rounded 
                '
            >
                <div className='flex items-center' >
                    {/* INPUT FIELD */}
                    <label
                        className="
                        form-control
                        ml-3
                    ">
                        <input type="checkbox" name="checkbox" />
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
                        ${status === "InComplete" ? "text-[#f61f1f]" : "text-[#18b152]"}
                        `}
                        >{status}</span>

                        {/* -------DATE&TIME_START----- */}
                        <div>
                            <span
                                className="
                            font-mono
                            text-[15px]
                            opacity-50
                            "
                            >{time}</span>
                            <span
                                className="
                            font-mono
                            text-[15px]
                            opacity-50
                            ml-2
                            "
                            >{date}</span>
                        </div>
                        {/* -------DATE&TIME_END----- */}
                    </div>
                    {/* -------STATUS_BAR_END----- */}
                </div>

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
                    >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum corrupti laborum delectus culpa officia earum distinctio facere! Inventore, suscipit voluptatibus eveniet, veritatis fuga tempore temporibus recusandae repellendus maiores reprehenderit harum facilis sint exercitationem nostrum dolorem eius quos aut ea pariatur, eligendi laborum quia deleniti? Itaque, a. Sit hic velit repudiandae.</span>

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