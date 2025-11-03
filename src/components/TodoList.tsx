"use client";

import React, { useEffect, } from 'react';
import FilterBar from './FilterBar';
import Todo from './Todo';
import "@/styles/todo_list.scss";
import { useTodoStore } from '@/store/useTodoStore';
import { fetchTodos } from '@/lib/fetchTodos';


const TodoList = () => {

  const { todos, setTodos } = useTodoStore();

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
        
        const data = await fetchTodos();
        setTodos(data);
        // console.log("✅ Todos fetched:", data);
      } catch (error) {
        console.error("❌ Error fetching todos:", error);
      }
    };
    getTodos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
              // eslint-disable-next-line react/jsx-key
              <Todo _id={todo._id} title={todo.title} description={todo.description || ""} createdAt={todo.createdAt} isComplete={todo.isComplete} />
            )
          )
        }

      </ul>

    </div>
  )
}

export default TodoList
