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

export const getAvailableSchedule = async (req, res) => {
  try {
    const schedules = await Schedule.find({ isBooked: false});
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ messagae: error.message});

  };
};

export const bookSchedule = async (req, res) => {
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
    res.status(500).json({ message: error.message});
  }
};
export const getOwnerBookedSchedule = async (req, res) => {
  try {
    const schedules = await Schedule.find({
      owner: req.user._id,
      iaBooked: true
    }).populate("client", "name email");

    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
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