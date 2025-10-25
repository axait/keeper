import mongoose, { Schema, models } from "mongoose";

const TodoSchema = new Schema(
  {
    key: { type: Schema.Types.Mixed, required: true }, // can be number or string
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ["InComplete", "Completed"], default: "InComplete" },
  },
  { timestamps: true }
);

export const Todo = models.Todo || mongoose.model("Todo", TodoSchema);
