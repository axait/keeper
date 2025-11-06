import { create } from 'zustand';
import {v4 as uuid4} from 'uuid';

export type ToastType = {
    _id: string;
    message: string
};

type ToastState = {
  toasts: ToastType[];
  addToast: (message: string) => void;
  setToast: (newToast: ToastType[]) => void;
  removeToast: (id: string) => void;
  removeAll: () => void;
};

export const useToastStore = create<ToastState>()(
  // persist(
    (set) => ({
      toasts: [],

      addToast: (message) =>
        set((state) => ({
          toasts: state.toasts.concat({_id: uuid4(), message}).slice(),
        })),

      setToast: (newToast) =>
        set(() => ({
          toasts: [...newToast],
        })),


      removeToast: (id) =>
        set((state) => ({
          toasts: state.toasts.filter((category) => category._id !== id),
        })),

      removeAll: () =>
        set(() => ({
          toasts: [],
        })),
    }),
    // { name: 'todo-storage' } // key in localStorage
  // )
);
