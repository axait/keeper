'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useCategoryStore } from '@/store/useCategoryStore';
import { z } from 'zod';
import "@/styles/PrompterGetter.scss";
import { useToastStore } from '@/store/useToastStore';
import axios from 'axios';
import { useTodoStore } from '@/store/useTodoStore';
import { fetchTodos } from '@/lib/fetchTodos';


const PrompterGetter = () => {
    const textAreaDescriptionRef = useRef<HTMLTextAreaElement | null>(null);

    // data to save of todo
    const [titleState, setTitle] = useState<string>('');
    const [descriptionState, setDescription] = useState<string>('');
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>()

    // to Display Error On Screen.
    // CREATE TOAST FOR IT.

    // to handle prompter collapser
    const [displayNone, setDisplayNone] = useState<string>('display-none')

    // to get all categories list from store
    const { categories  } = useCategoryStore();
    const { addToast } = useToastStore();
    const { setTodos } = useTodoStore();


    const handleTodoSaver = async () => {
        const todoSchema = z.object({
            title: z.string()
                .min(1, "Title is required")
                .max(30, "Title cannot exceed 30 characters"),
            description: z.string()
                .max(80, "Description cannot exceed 80 characters")
                .optional()
                .nullable(),
            selectedCategoryId: z.string().min(1, "Select a category"),
        });

        const result = todoSchema.safeParse({
            title: titleState,
            description: descriptionState,
            selectedCategoryId,
        });

        if (!result.success) {
            console.log(titleState, descriptionState, selectedCategoryId);
            // console.log(result.error.message);
            addToast(result.error.message);
            return;
        }
        console.log("✅ Validation OK:", result.data);

        axios.post('/api/todo/create', JSON.stringify({
            parentCategoryId: selectedCategoryId,
            todoName: titleState,
            todoDescription: descriptionState
        }
        ))
            .then((res) => {
                addToast(res.data.message)
                fetchTodos()
                .then((data) => {
                    setTodos(data)
                })
                setTitle('')
                setDescription('')
                setSelectedCategoryId('')
            })
            .catch((error) => {
                addToast(error)
            })
    };



    const handleDecriptTestAreaInput = () => {
        const textarea = textAreaDescriptionRef.current;
        if (!textarea) return;

        // Reset height first
        textarea.style.height = "auto";

        // Then set new height up to 250px
        textarea.style.height = Math.min(textarea.scrollHeight, 250) + "px";
    };


    return (
        <div className="flex justify-center fixed bottom-3 w-full"
        // onMouseLeave={() => { setDisplayNone('display-none') }}
        >
            <div
                onMouseOver={() => { setDisplayNone('') }}
                onFocus={() => { setDisplayNone('') }}

                className="
                flex flex-col
                w-[96vw] md:w-[63%]
                px-4 py-2
                rounded-xl
                shadow-md shadow-white/20
                bg-[#212121]
                "
            >
                <div className="flex flex-col">
                    <label className={`text-sm font-bold ${displayNone}`} >Title</label>
                    <input
                        type="title"
                        onFocus={() => { setDisplayNone('') }}
                        onChange={(e) => {
                            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                            e.target.value === "" ? setDisplayNone('display-none') : setDisplayNone('')
                            setTitle(e.target.value)
                        }}
                        value={titleState}
                        className="
                        text-[0.85rem]
                        outline-0
                        p-2
                        "
                        placeholder="Write Todo Here ..."
                    />
                </div>

                <hr className={`my-4  ${displayNone}`} />

                <div className={`flex flex-col  ${displayNone}`}>
                    <label className="text-sm font-bold">Description</label>

                    <textarea
                        ref={textAreaDescriptionRef}
                        onInput={handleDecriptTestAreaInput}
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                        value={descriptionState}
                        className="
                        text-[0.85rem]
                        outline-0
                        p-2
                        min-h-[50px]
                        max-h-[250px]
                        resize-none
                        overflow-auto
                        "
                        placeholder="Write Description Here ..."
                    />
                </div>

                <div className={`flex justify-between  ${displayNone}`}>

                    <div className='badge badge-soft badge-primary' >
                        <select
                            className="text-[0.85rem] p-2 outline-0 w-20"
                            defaultValue={selectedCategoryId}
                            value={selectedCategoryId}
                            onChange={(e) => setSelectedCategoryId(e.target.value)}
                        >
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    @{category.title}
                                </option>
                            ))}
                        </select>

                    </div>

                    <button
                        className="
                        text-white
                        bg-[#39393992]
                        hover:bg-[#4f46e5]
                        rounded-full
                        btn-circle
                        p-1
                        ml-2
                        "
                        style={{ transition: 'all 0.2s ease-in-out' }}

                        onClick={handleTodoSaver}
                    >
                        <Image src="/arrow_upload.png"
                            className='cursor-pointer'
                            alt="avatar"
                            width={26} height={26} />
                    </button>
                </div>
                <div className="flex justify-end"></div>
            </div>
        </div>
    );
};

export default PrompterGetter;
