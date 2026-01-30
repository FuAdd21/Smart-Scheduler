import Schedule from "../models/Schedule.js";

export const createSchedule = async (req, res, next) => {
  try {
    const { date, time } = req.body;

    const schedule = await Schedule.create({
      owner: req.user._id, // from JWT
      date,
      time
    });

    res.status(201).json(schedule);
  } catch(error) {
  next(error);
}

};

export const getAvailableSchedule = async (req, res) => {
  try {
    const schedules = await Schedule.find({ isBooked: false});
    res.json(schedules);
  } catch(error) {
  next(error);
};
};

const bookSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);

    if(!schedule) {
      return res.status(404).json({ message: "Schedule not found"})
    }

    if(schedule.isBooked) {
      return res.status(400).json({ message: "Already booked"});
    }
    
    schedule.isBooked = true;
    schedule.client = req.user._id;

    await schedule.save()

    res.json({ message: "Booked successfully"});

    await Notification.create({
  user: schedule.owner,
  message: "A client booked your schedule"
});


  } catch(error) {
    next(error);
  }

};
export default bookSchedule
export const getOwnerBookedSchedule = async (req, res) => {
  try {
    const schedules = await Schedule.find({
      owner: req.user._id,
      iaBooked: true
    }).populate("client", "name email");

   return res.json(schedules);
  }catch(error) {
      next(error);
    }

};
export const cancelBooked = async (req, res) => {
  const schedule = await Schedule.findById(req.params.id)

  if(!schedule) {
    return res.status(404).json({message: "schedule not found"})
  }
  if(
     schedule.client?.toString() !== req.user.id &&
    req.user.role !== "owner"
) {
   return res.status(403).json({ message: "Not allowed" });
};

schedule.isBooked = false;
  schedule.client = null;

  await schedule.save();

  res.json({ message: "Booking cancelled" });


};

export const updateSchedule = async (req, res) => {
  const schedule = await Schedule.findById(req.params.id);

  if (!schedule) {
    return res.status(404).json({ message: "Schedule not found" });
  }

  schedule.date = req.body.date || schedule.date;
  schedule.time = req.body.time || schedule.time;

  await schedule.save();

  res.json(schedule);
};
export const delateSchedule = async (req, res) => {
  const schedule = await Schedule.findById(req.params.id);

  if (!schedule) {
    return res.status(404).json({ message: "Schedule not found" });
  }

  await schedule.deleteOne();

  res.json({ message: "Schedule deleted" });
}

export const notification = async (req, res) => {
  const notes = await Notification.find({ user: req.user.id });
  res.json(notes);
};

export const getSchedules = async (req, res) => {
  const query = {};

  if (req.query.date) query.date = req.query.date;
  if (req.query.owner) query.owner = req.query.owner;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const skip = (page - 1) * limit;

  const total = await Schedule.countDocuments(query);

  const schedules = await Schedule.find(query)
    .populate("owner", "name email")
    .skip(skip)
    .limit(limit)
    .sort({ date: 1 });

  res.json({
    total,
    page,
    pages: Math.ceil(total / limit),
    data: schedules
  });
};
