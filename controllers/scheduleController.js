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

