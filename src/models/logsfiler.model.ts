import mongoose, { Schema, Document, models } from "mongoose";


export interface ILogsFiler extends Document {
    _id: string;
    message: string;
    time: string;
    status: "info" | "success" | "error" | "warning" | "errorserious",
    createdAt: Date;
}

const logsfilerSchema = new Schema<ILogsFiler>(
    {
        time: { type: String, required: true }, // for easy displaying on frontend -> format: HH:MM:SS DD/MM/YYYY
        message: { type: String, required: true },
        status: {
            type: String,
            enum: ["info", "success", "error", "warning", "errorserious"],
            default: "info",
        }
    },
    { timestamps: { createdAt: true, updatedAt: false }, }
)

export const logsfilerModel = models.LogsFiler || mongoose.model<ILogsFiler>("LogsFiler", logsfilerSchema)