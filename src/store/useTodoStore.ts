import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

type Todo = {
  _id: string;
  parentCategoryId: string;
  title: string;
  description?: string;
  isComplete: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
};

type TodoState = {
  todos: Todo[];
  addTodos: (newTodos: Todo[]) => void;
  setTodos: (newTodos: Todo[]) => void;
  updateTodo: (newTodo: Todo) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  removeAllTodo: () => void;
};

export const useTodoStore = create<TodoState>()(
  // persist(
    (set) => ({
      todos: [],

      addTodos: (newTodos) =>
        set((state) => ({
          todos: [...state.todos, ...newTodos],
        })),

      setTodos: (newTodos) =>
        set(() => ({
          todos: [...newTodos],
        })),

      updateTodo: (newTodo) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t._id === newTodo._id ? { ...t, ...newTodo } : t
          ),
        })),

      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t._id === id ? { ...t, isComplete: !t.isComplete } : t
          ),
        })),

      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo._id !== id),
        })),

      removeAllTodo: () =>
        set(() => ({
          todos: [],
        })),
    }),
    // { name: 'todo-storage' } // key in localStorage
  // )
);
