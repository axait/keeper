import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import { Todo } from "@/models/Todo";
import { TodosType } from "@/types/TodosType.ts";

export async function GET() {
  try {
    await connectToDB();
    const todos: TodosType[] = await Todo.find();
    return NextResponse.json({ success: true, todos });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
