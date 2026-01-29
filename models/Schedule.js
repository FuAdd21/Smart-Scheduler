import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema(
{
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: String, // simple for now (YYYY-MM-DD)
        required: true
    },
    time: {
        type: String, // e.g. "09:00 - 10:00"
        required: true
    },
    isBooked: {
        type: Boolean,
        default: false
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    },
    { timestamps: true }
    
);

export default mongoose.model("Schedule", scheduleSchema);
