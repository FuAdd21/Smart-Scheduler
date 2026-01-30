import Booking from "../models/Booking.js";
import Schedule from "../models/Schedule.js";


const getOwnerStats = async (req, res) => {
  const ownerId = req.user._id;

  const totalSchedules = await Schedule.countDocuments({ owner: ownerId });

  const ownerSchedules = await Schedule.find({ owner: ownerId }).select("_id");
  const scheduleIds = ownerSchedules.map(s => s._id);

  const totalBookings = await Booking.countDocuments({
    schedule: { $in: scheduleIds }
  });

  res.json({
    totalSchedules,
    totalBookings
  });
};

export default getOwnerStats
