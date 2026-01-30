import Booking from "../models/Booking.js";


const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate("schedule")
    .sort({ createdAt: -1 });

  res.json(bookings);


const existing = await Booking.findOne({
  schedule: scheduleId
});

if (existing) {
  return res.status(400).json({
    message: "This slot is already booked"
  });
}

};

export default getMyBookings;
