import mongoose, { Schema, Document, models } from "mongoose";

interface ICategory extends Document {
    categoryId: string,
    title: string,
    description?: string,
    isDefault: boolean,
    createdBy: string,  // userId reference
    createdAt: Date,
    updatedAt: Date,
}

const categorySchema = new Schema<ICategory>(
    {
        categoryId: { type: String, required: true, unique: true  },
        title: { type: String, required: true },
        description: { type: String },
        isDefault: { type: Boolean, default: false },
        createdBy: { type: String, ref: "User", }, // userId reference
    },
    { timestamps: true }
)

export const categoryModel = models.Category || mongoose.model<ICategory>("Category", categorySchema)