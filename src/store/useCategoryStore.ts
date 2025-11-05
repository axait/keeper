

import { create } from 'zustand';

export type CategoryType = {
    _id: string;
    title: string,
    description: string,
    isDefault: boolean,
    createdBy: string,
    createdAt: string,
    updatedAt: string,
};

type CategoryState = {
  categories: CategoryType[];
  addCategory: (newCategory: CategoryType[]) => void;
  setCategory: (newCategory: CategoryType[]) => void;
  removeCategory: (id: string) => void;
};

export const useCategoryStore = create<CategoryState>()(
  // persist(
    (set) => ({
      categories: [],

      addCategory: (newCategory) =>
        set((state) => ({
          categories: [...state.categories, ...newCategory],
        })),

      setCategory: (newCategory) =>
        set(() => ({
          categories: [...newCategory],
        })),


      removeCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((category) => category._id !== id),
        })),
    }),
    // { name: 'todo-storage' } // key in localStorage
  // )
);
