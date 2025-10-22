import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(req: Request) {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db(); // will use the one from URI (e.g. keeperdb)
    const todosCollection = db.collection("todos");

    const body = await req.json();
    const { title, description, date, time, status } = body;

    // Basic validation
    if (!title || !description || !date || !time || !status) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Create a new todo
    const newTodo = {
      title,
      description,
      date,
      time,
      status,
      createdAt: new Date(),
    };

    const result = await todosCollection.insertOne(newTodo);

    await client.close();

    return NextResponse.json({
      message: "✅ Todo added successfully",
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("❌ Error adding todo:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
