"use client";

import React, { useEffect, useState } from 'react';
import FilterBar from './FilterBar';
import Todo from './Todo';
import { type TodosType } from './Todo';
import "@/styles/todo_list.scss";


const TodoList = () => {

    const [todos, setTodos] = useState<TodosType[]>([]);
    // FOR DUMMY TODOS DATA
    useEffect(() => {
        setTodos([
            {
                key: 1,
                title: "Buy Milk",
                description: "Buy milk from the AK store",
                date: "2023-05-15",
                time: "10:00 AM",
                status: "Completed"
            },
            {
                key: 2,
                title: "Buy Bread",
                description: "Buy bread from the local bakery",
                date: "2023-05-16",
                time: "11:00 AM",
                status: "InCompleted"
            },
            {
                key: 3,
                title: "Buy Eggs",
                description: "Buy eggs from the market",
                date: "2023-05-17",
                time: "12:00 PM",
                status: "InCompleted"
            }
        ]);
    }, [])


    return (
        <div>
            <ul
                className='
            flex flex-col
            w-[98%] md:w-[65%]
            mx-auto
            '
            >
                <FilterBar />
                {
                    todos.map(
                        todo => (
                            <Todo key={todo.key} title={todo.title} description={todo.description} date={todo.date} time={todo.time} status={todo.status} />
                        )
                    )
                }

            </ul>

        </div>
    )
}

export default TodoList
