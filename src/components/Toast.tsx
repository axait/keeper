"use client";

import { useToastStore } from "@/store/useToastStore";
import { useEffect } from "react";

export default function Toast() {
    const { toasts } = useToastStore();
    
    return (
        <div className="toast">
            {toasts.map(({ message, _id }) => (
                <ToastDisplayer key={_id} _id={_id}>{message}</ToastDisplayer>
            ))}
        </div>
    );
}


const ToastDisplayer = ({ _id, children }: { _id: string, children: React.ReactNode }) => {
    const { toasts, removeToast } = useToastStore();
    
    useEffect(() => {
        const timer = setTimeout(() => {
            removeToast(_id);
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toasts.length]);
    
    return (
        <div key={_id}>
            {children}
        </div>
    )
}

