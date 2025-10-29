"use client";

import React, { useEffect, useState } from 'react';
import FilterBar from './FilterBar';
import Todo from './Todo';
import { TodosType } from '@/types/TodosType';
import "@/styles/todo_list.scss";


const TodoList = () => {

    const [todos, setTodos] = useState<TodosType[]>([]);
    // FOR DUMMY TODOS DATA
    // useEffect(() => {
    //     setTodos([
    //         {
    //             key: 1,
    //             title: "Buy Milk",
    //             description: "Buy milk from the AK store",
    //             date: "01/Jan",
    //             time: "10:00AM",
    //             status: "Completed"
    //         },
    //         {
    //             key: 2,
    //             title: "Buy Bread",
    //             description: "Buy bread from the local bakery",
    //             date: "24/May",
    //             time: "11:00AM",
    //             status: "InComplete"
    //         },
    //         {
    //             key: 3,
    //             title: "Buy Eggs",
    //             description: "Buy eggs from the market",
    //             date: "17/Dec",
    //             time: "12:00PM",
    //             status: "InComplete"
    //         }
    //     ]);
    // }, [])

     useEffect(() => {
    const getTodos = async () => {
      try {
        console.log("🔍 Fetching todos...");
        const res = await fetch("/api/todos/get");
        const data = await res.json();
        setTodos(data);
        console.log("✅ Todos fetched:", data);
      } catch (error) {
        console.error("❌ Error fetching todos:", error);
      }
    };
    getTodos();
  }, []);


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
                            <Todo key={todo._id} title={todo.title} description={todo.description} date={todo.date} time={todo.time} status={todo.status} />
                        )
                    )
                }

            </ul>

        </div>
    )
}

export default TodoList
