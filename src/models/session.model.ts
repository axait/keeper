import mongoose, { Schema, Document, models } from "mongoose";

interface ISession extends Document {
    sessionId: string,
    userId: string,
    status: "signedin" | "signedout",
    createdAt: Date,
    updatedAt: Date,
};

const sessionSchema = new Schema<ISession>(
    {
        sessionId: { type: String, required: true,  unique: true  },
        userId: { type: String, required: true },
        status: {
            type: String,
            enum: ["signedin", "signedout"],
            required: true,
        },
    },
    { timestamps: true }
);

export const sessionModel = models.Session || mongoose.model<ISession>("Session", sessionSchema);