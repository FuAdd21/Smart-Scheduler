import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    schedule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schedule",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
