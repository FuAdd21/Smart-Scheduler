import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: String,
      required: true,
    },
    
    // Core Booking Integrity Fields
    serviceName: { type: String, default: "Standard Session" },
    serviceType: { type: String, default: "standard" },
    duration: { type: Number, default: 30 }, // Default 30 minutes
    color: { type: String, default: "bg-blue-500" },

    slots: [
      {
        time: String,
        isBooked: {
          type: Boolean,
          default: false,
        },
        client: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Schedule", scheduleSchema);
