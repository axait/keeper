"use client";

import React from 'react';
import FilterBar from './FilterBar';
import Todo from './Todo';
import "@/styles/todo_list.scss";

const TodoList = () => {
  return (
    <div>
        <ul
            className='
            flex flex-col
            w-[98%] md:w-[65%]
            mx-auto
            '
        >
            <FilterBar/>
            <Todo/>
            
        </ul>
      
    </div>
  )
}

export default TodoList
