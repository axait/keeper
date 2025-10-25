import mongoose, { Schema } from "mongoose";


export interface IUser extends Document {
    userId: string;
    name: string;
    email: string;
    password: string;
    status: "verified" | "unverified" | "deleted" | "blocked";
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        userId: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        status: {
            type: String,
            enum: ["verified", "unverified", "deleted", "blocked"],
            default: "unverified",
        }
    },
    { timestamps: true }
)

export const userModel = mongoose.models.user || mongoose.model<IUser>("user", userSchema)