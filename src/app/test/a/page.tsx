'use client';

import { useTodoStore } from '@/store/useTodoStore';
import React, { useState } from 'react';

export default function TodoPage() {
    const [text, setText] = useState('');
    const { todos, addTodo, toggleTodo, removeTodo } = useTodoStore();

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">📝 Todo List</h1>

            <div className="flex gap-2 mb-4">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="border px-3 py-1 rounded"
                    placeholder="Add a todo..."
                />
                <button
                    onClick={() => {
                        if (text.trim() !== '') {
                            addTodo([
                                {
                                    _id: "string",
                                    parentCategoryId: "string",
                                    title: text,
                                    description: "string",
                                    isComplete: false,
                                    createdAt: Date(),
                                    updatedAt: Date(),
                                }
                            ]);
                        }
                        setText('');
                    }}
                    className="bg-blue-600 text-white px-4 py-1 rounded"
                >
                    Add
                </button>
            </div>

            <ul className="space-y-2">
                {todos.map((todo) => (
                    <li key={todo._id} className="flex justify-between items-center">
                        <span
                            onClick={() => toggleTodo(todo._id)}
                            className={`cursor-pointer ${todo.isComplete ? 'line-through text-gray-400' : ''
                                }`}
                        >
                            {todo.title}
                        </span>
                        <button
                            onClick={() => removeTodo(todo._id)}
                            className="text-red-500"
                        >
                            ✕
                        </button>
                    </li>
                ))}
            </ul>
        </div >
    );
}
