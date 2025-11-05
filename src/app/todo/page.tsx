"use client";

import TodoList from "@/components/TodoList";
import PrompterGetter from "@/components/PrompterGetter";
import { MySideBar } from "@/components/MySideBar";


export default function Home() {
  return (
    <>
      <br />
      <TodoList />
      <PrompterGetter />
      <MySideBar />   

    </>
  );
}
