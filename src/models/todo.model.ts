import mongoose, { Schema, models } from "mongoose";


export interface ITodo extends Document {
    todoId: string;
    parentCategoryId: string;
    title: string;
    description?: string;
    status: "InComplete" | "Completed";
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
}

const TodoSchema = new Schema<ITodo>(
    {
        todoId: { type: String, required: true }, // can be number or string
        title: { type: String, required: true },
        description: { type: String },
        status: {
            type: String,
            enum: ["InComplete", "Completed"],
            default: "InComplete",
        },
        createdBy: { type: String, required: true },
    },
    { timestamps: true }
);

export const todoModel = models.todo || mongoose.model<ITodo>("todo", TodoSchema);
