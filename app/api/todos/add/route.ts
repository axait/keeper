import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

// 🪄 Toggle this to enable/disable logs
const DEBUG = process.env.DEBUG_MODE;


// Smart logger — prints only when DEBUG is true
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const log = (...args: any[]) => {
  if (DEBUG) console.log(...args);
};

export async function POST(req: Request) {
  log("📩 [POST] /api/todos/add — Request received");

  try {
    // Step 1: Connect to MongoDB
    log("🔌 Connecting to MongoDB...");
    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    log("✅ MongoDB connected successfully");

    const db = client.db();
    log("🗂️ Using Database:", db.databaseName);

    const todosCollection = db.collection("todos");
    log("📚 Using Collection: todos");

    // Step 2: Parse request body
    const body = await req.json();
    log("🧾 Request Body:", body);

    const { title, description, status } = body;

    // Step 3: Validation
    if (!title || !description || !status) {
      log("⚠️ Missing fields in request");
      return NextResponse.json(
        { error: "Title, description, and status are required" },
        { status: 400 }
      );
    }

    // Step 4: Get date and time on server
    const now = new Date();
    const date = `${now.getDate()}/${now.toLocaleString("default", {
      month: "short",
    })}`;
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = now.getHours() >= 12 ? "PM" : "AM";
    const time = `${hours}:${minutes}${ampm}`;

    // Step 5: Create todo
    const newTodo = {
      title,
      description,
      date,
      time,
      status,
      createdAt: now,
    };
    log("🆕 New Todo Object:", newTodo);

    // Step 6: Insert into DB
    log("💾 Inserting todo into MongoDB...");
    const result = await todosCollection.insertOne(newTodo);
    log("✅ Insert successful. ID:", result.insertedId);

    // Step 7: Close connection
    await client.close();
    log("🔒 MongoDB connection closed.");

    // Step 8: Return success response
    log("🎉 Todo added successfully!");
    return NextResponse.json({
      message: "✅ Todo added successfully",
      insertedId: result.insertedId,
      data: newTodo,
    });
  } catch (error) {
    console.error("❌ Error adding todo:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
