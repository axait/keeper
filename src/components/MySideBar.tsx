"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { CategoryType, useCategoryStore } from "@/store/useCategoryStore";
import "@/styles/MySideBar.scss";


export function MySideBar() {
    // const [isCollapsed, setIsCollapsed] = useState(true);
    const { categories, setCategory } = useCategoryStore();
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isCreateCategory, setIsCreateCategory] = useState(false)
    const [collapsedClasses, setCollapsedClasses] = useState('')


    const createCategory = () => {
        setIsCreateCategory(true);
    }

    useEffect(() => {
        if (isCollapsed) {
            setCollapsedClasses('sidebar-collapsed')

        } else {
            setCollapsedClasses('')

        }

    }, [isCollapsed]);




    useEffect(() => {
        axios.post("/api/category/getAll").then((res) => {
            setCategory(res.data.data)
        })

    }, [categories.length]);

    return (
        <>
            { 
                isCreateCategory?
                <MyCategoryCreator close={() => { setIsCreateCategory(false) }} />
                :
                ""
            }
            <div className={`
                absolute top-20 left-2
                min-w-40 min-h-[85%]
                bg-[#191919]
                rounded-lg
                overflow-y-scroll
                py-1
                ${isCollapsed ? 'sidebar-size-collapsed' : ''}
            `}>
                <span
                    className="
                    absolute bottom-2 right-0
                ">
                    <Image src="/collapse.png" alt="category icon"
                        width={25} height={30}
                        onClick={() => { setIsCollapsed(!isCollapsed) }}
                        className={`
                        inline-block
                        w-[30px]
                        pb-1 pt-1
                        rounded-lg
                        hover:cursor-pointer
                        hover:bg-[#331d6582]
                        ${isCollapsed ? 'p-0' : ''}
                        `}
                    />
                </span>
                <div
                    className={`${collapsedClasses}`}
                >
                    <span
                        key="id"
                        onClick={createCategory}
                        className="
                    block 
                    px-4 py-2
                    my-1 mx-2
                    text-white
                    hover:bg-[#331d6582] 
                    cursor-pointer
                    rounded-lg
                    textarea-sm
                    font-sans
                    "
                    >
                        <Image src="/add.png" alt="category icon"
                            width={20} height={20}
                            className="
                        inline-block
                        pb-[0.18rem] pr-[0.05rem]
                        "
                        />
                        Create
                    </span>
                    <ul>
                        {
                            categories.map((category: CategoryType) => (
                                <li
                                    key={category._id}
                                    className="
                                block 
                                px-4 py-2
                                my-1 mx-2
                                text-white
                                hover:bg-[#331d6582] 
                                cursor-pointer
                                rounded-lg
                                textarea-sm
                                font-sans
                                "
                                >
                                    <Image src="/category.png" alt="category icon"
                                        width={20} height={20}
                                        className="
                                    inline-block
                                    pb-1 pr-1
                                    "
                                    />
                                    {category.title}
                                </li>
                            ))
                        }

                    </ul>
                </div>

            </div>
        </>
    );
}


const MyCategoryCreator = ({ close }: { close: () => void }) => {
    const { addCategory } = useCategoryStore();

    return (
        <div
            className="
            flex justify-center items-center
            fixed top-0 left-0 
            h-screen w-screen
            bg-[#6548818d]
            z-30
            "
        >
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const title = formData.get('title');

                    if (title) {
                        axios.post("/api/category/create", {
                            categoryName: title,
                            categoryDescription: "Nothing"
                        })
                        .then((res) => {
                            if (res.data.success) {
                                addCategory(res.data.data);
                                close(); // ✅ CLOSE MODAL AFTER SUCCESS
                            }
                        })
                        .catch((error) => console.log(error));
                    }
                }}>
                    <input type="text" name="title" placeholder="Enter category name"
                        className="px-4 py-2 my-1 mx-2 
                        bg-[#594f6f82] 
                        hover:bg-[#331d6582] 
                        rounded-lg 
                        textarea-sm font-sans" 
                    />
                    <button 
                        type="submit" 
                        className="px-4 py-2 my-1 mx-2 text-white bg-[#271c4182] hover:bg-[#331d6582] rounded-lg textarea-sm font-sans"
                    >
                        Create
                    </button>
                </form>
            </div>
        </div>
    )
}


export default MySideBar
