import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";


export async function GET() {

  try {
    // Step 1: Connect to MongoDB
    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    
    const db = client.db(); // Uses the DB from your URI

    const todosCollection = db.collection("todos");

    // Step 2: Fetch all todos
    const todos = await todosCollection.find({}).sort({ createdAt: -1 }).toArray();

    // Step 3: Close DB connection
    await client.close();

    // Step 4: Return todos
    return NextResponse.json(todos);
  } catch (error) {
    console.error("❌ Error fetching todos:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
