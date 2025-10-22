import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

// 🪄 Toggle this to enable/disable logs
const DEBUG = process.env.DEBUG_MODE;

// Smart logger — only logs when DEBUG is true
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const log = (...args: any[]) => {
  if (DEBUG) console.log(...args);
};

export async function DELETE(req: Request) {
  log("🗑️ [DELETE] /api/todos/delete — Request received");

  try {
    // Step 1: Parse request body
    const body = await req.json();
    log("🧾 Request Body:", body);

    const { id } = body;

    // Step 2: Validate input
    if (!id) {
      log("⚠️ Missing 'id' in request body");
      return NextResponse.json(
        { error: "Todo ID is required" },
        { status: 400 }
      );
    }

    // Step 3: Connect to MongoDB
    log("🔌 Connecting to MongoDB...");
    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    log("✅ MongoDB connected successfully");

    const db = client.db();
    const todosCollection = db.collection("todos");
    log("📚 Using Collection: todos");

    // Step 4: Delete todo by ID
    log("🗑️ Deleting todo with ID:", id);
    const result = await todosCollection.deleteOne({ _id: new ObjectId(id) });

    // Step 5: Close DB connection
    await client.close();
    log("🔒 MongoDB connection closed.");

    // Step 6: Handle response
    if (result.deletedCount === 0) {
      log("⚠️ No todo found with that ID");
      return NextResponse.json(
        { error: "Todo not found" },
        { status: 404 }
      );
    }

    log("✅ Todo deleted successfully!");
    return NextResponse.json({
      message: "✅ Todo deleted successfully",
      deletedId: id,
    });
  } catch (error) {
    console.error("❌ Error deleting todo:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
