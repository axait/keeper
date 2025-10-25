import mongoose, { Schema } from "mongoose";

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

export const sessionModel = mongoose.models.session || mongoose.model<ISession>("session", sessionSchema);