'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import "@/styles/PrompterGetter.scss";
import { useCategoryStore } from '@/store/useCategoryStore';


const PrompterGetter = () => {
    const textAreaDescriptionRef = useRef<HTMLTextAreaElement | null>(null);

    const [displayNone, setDisplayNone] = useState<string>('display-none')
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>()

    const [titleState, setTitle] = useState<string>('');
    const [descriptionState, setDescription] = useState<string>('');

    const { categories } = useCategoryStore();


    const handleCategorySelection = () => {
        return 0;
    }

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
            onMouseLeave={() => { setDisplayNone('display-none') }}
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

                        onClick={handleCategorySelection}
                    >
                        <Image src="/arrow_upload.png"
                            className='cursor-pointer'
                            alt="avatar"
                            width={26} height={26} />
                    </button>
                </div>

                {/* have a dropdown here which reads the categoriesState and then show them to select and also there is btn at this right side which is reponsible of sending this input to server */}
                <div className="flex justify-end"></div>
            </div>
        </div>
    );
};

export default PrompterGetter;
