import Booking from "../models/Booking.js";
import Schedule from "../models/Schedule.js";


const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("schedule")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching bookings" });
  }
};

export default getMyBookings;


export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // client OR owner can cancel
    const isClient = booking.user.toString() === req.user._id.toString();
    const schedule = await Schedule.findById(booking.schedule);
    const isOwner = schedule.owner.toString() === req.user._id.toString();

    if (!isClient && !isOwner) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // free the slot
    schedule.slots = schedule.slots.map(slot =>
      slot.time === booking.time
        ? { ...slot.toObject(), isBooked: false }
        : slot
    );

    await schedule.save();
    await booking.deleteOne();

    res.json({ message: "Booking cancelled" });
  } catch (error) {
    console.error("Cancel booking error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

