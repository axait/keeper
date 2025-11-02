import mongoose, { Schema, Document, models } from "mongoose";


export interface ITodo extends Document {
    parentCategoryId: string;
    title: string;
    description?: string;
    isComplete: boolean;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
}

const TodoSchema = new Schema<ITodo>(
    {
        parentCategoryId: { type: String, required: true, unique: false },
        title: { type: String, required: true },
        description: { type: String },
        isComplete: {
            type: Boolean,
            default: false,
        },
        createdBy: { type: String, required: true },
    },
    { timestamps: true }
);

export const todoModel = models.Todo || mongoose.model<ITodo>("Todo", TodoSchema);
