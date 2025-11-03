import React, { useRef } from 'react';

const PrompterGetter = () => {
    const textAreaDescriptionRef = useRef<HTMLTextAreaElement | null>(null);

    const handleDecriptTestAreaInput = () => {
        const textarea = textAreaDescriptionRef.current;
        if (!textarea) return;

        // Reset height first
        textarea.style.height = "auto";

        // Then set new height up to 250px
        textarea.style.height = Math.min(textarea.scrollHeight, 250) + "px";
    };

    return (
        <div className="flex justify-center fixed bottom-3 w-full">
            <div
                className="
                flex flex-col
                w-[96%] md:w-[63%]
                px-4 py-2
                rounded-xl
                shadow-md shadow-white/20
                bg-[#212121]
                "
            >
                <div className="flex flex-col">
                    <label className="text-sm font-bold">Title</label>
                    <input
                        type="text"
                        className="
                        text-[0.85rem]
                        outline-0
                        p-2
                        "
                        placeholder="Write Todo Here ..."
                    />
                </div>

                <hr className="my-4" />

                <div className="flex flex-col">
                    <label className="text-sm font-bold">Description</label>

                    <textarea
                        ref={textAreaDescriptionRef}
                        onInput={handleDecriptTestAreaInput}
                        className="
                        text-[0.85rem]
                        outline-0
                        p-2
                        min-h-[100px]
                        max-h-[250px]
                        resize-none
                        overflow-auto
                        "
                        placeholder="Write Description Here ..."
                    />
                </div>
            </div>
        category selector and upload (save) btn

            <div className="flex justify-end"></div>
        </div>
    );
};

export default PrompterGetter;
