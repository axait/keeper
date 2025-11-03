import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Todo = {
    _id: string;
    parentCategoryId: string;
    title: string;
    description?: string;
    isComplete: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createdAt: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updatedAt: any;
};

type TodoState = {
    todos: Todo[];
    addTodo: (newTodos: Todo[]) => void;
    setTodos: (newTodos: Todo[]) => void;
    toggleTodo: (id: string) => void;
    removeTodo: (id: string) => void;
};

export const useTodoStore = create<TodoState>()(
    persist(
        (set) => ({
            todos: [],

            addTodo: (newTodos: Todo[]) =>
                set((state) => ({
                    todos: [...state.todos, ...newTodos],
                })),
            setTodos: (newTodos: Todo[]) =>
                set(() => ({
                    todos: [...newTodos],
                })),

            toggleTodo: (id: string) =>
                set((state) => ({
                    todos: state.todos.map((t) =>
                        t._id === id ? { ...t, completed: !t.isComplete } : t
                    ),
                })),

            removeTodo: (id: string) =>
                set((state) => ({
                    todos: state.todos.filter((todo) => todo._id !== id),
                })),
        }),
        { name: 'todo-storage', } // key in localStorage)
    )
);
