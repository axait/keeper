import { MongoClient } from "mongodb";

export async function GET() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db(); // Automatically uses the one from URI

  console.log("✅ Connected to DB:", db.databaseName);

  const todos = await db.collection("todos").find().toArray();
  await client.close();

  return Response.json(todos);
}
