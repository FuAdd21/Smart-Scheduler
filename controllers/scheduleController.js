import Schedule from "../models/Schedule.js";

export const createSchedule = async (req, res) => {
  try {
    const { date, time } = req.body;

    const schedule = await Schedule.create({
      owner: req.user._id, // from JWT
      date,
      time
    });

    res.status(201).json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
