import mongoose, { Schema, Document, models } from "mongoose";

interface ISession extends Document {
    sessionId: string,
    userId: string,
    exp: number,
    status: "loggedin" | "loggedout",
    createdAt: Date,
    updatedAt: Date,
};

const sessionSchema = new Schema<ISession>(
    {
        sessionId: { type: String, required: true, unique: true },
        userId: { type: String, required: true, unique: true },
        // exp: { type: Number, required: true },
        exp: { type: Number },
        status: {
            type: String,
            enum: ["loggedin"],
            required: true,
        },
    },
    { timestamps: true }
);

export const sessionModel = models.Session || mongoose.model<ISession>("Session", sessionSchema);