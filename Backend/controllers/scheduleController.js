import Schedule from "../models/Schedule.js";




// helper to generate slots
const generateSlots = (startTime, endTime, duration) => {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  let current = startHour * 60 + startMinute;
  let end = endHour * 60 + endMinute;

  if (current >= end) {
    // Swap or return error
    console.log("❌ Start time must be before end time");
    return [];
  }

  const slots = [];
  while (current + duration <= end) {
    const hour = Math.floor(current / 60).toString().padStart(2, "0");
    const minute = (current % 60).toString().padStart(2, "0");
    slots.push({ time: `${hour}:${minute}`, isBooked: false });
    current += duration;
  }

  return slots;
};



export const createSchedule = async (req, res) => {
  console.log("Request body:", req.body);

  try {
    const { date, startTime, endTime, slotDuration, serviceName, serviceType, color } = req.body;
    
    // Validate required fields
    if (!serviceName || !serviceType || !color) {
       console.log("Missing core booking integrity fields (Phase 1)");
       // For backward compatibility or partial rollouts, you might set defaults here if not provided
    }

    const slots = generateSlots(startTime, endTime, slotDuration);

    const schedule = new Schedule({
      owner: req.user._id, 
      date,
      slots,
      // Core Booking Integrity Fields
      serviceName: serviceName || "Standard Session",
      serviceType: serviceType || "standard",
      duration: slotDuration,
      color: color || "bg-blue-500"
    });
    console.log("Generated slots:", slots)

    await schedule.save();

    res.status(201).json(schedule);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



export const getAvailableSchedule = async (req, res, next) => {
  try {
    // Find schedules where at least one slot is NOT booked
    const schedules = await Schedule.find({
      "slots.isBooked": false
    }).populate("owner", "name email");
    
    res.json(schedules);
  } catch(error) {
    next(error);
  }
};

import Booking from "../models/Booking.js"; // Import Booking model

export const bookSchedule = async (req, res, next) => {
  try {
    const { scheduleId, time } = req.body; // Expecting body params now

    const schedule = await Schedule.findById(scheduleId);

    if(!schedule) {
      return res.status(404).json({ message: "Schedule not found"})
    }

    // Find the slot
    const slot = schedule.slots.find(s => s.time === time);
    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    if(slot.isBooked) {
      return res.status(400).json({ message: "Already booked"});
    }
    
    // Mark slot as booked
    slot.isBooked = true;
    slot.client = req.user._id;

    await schedule.save();

    // Create a Booking record (if using a separate Booking model)
    await Booking.create({
      user: req.user._id,
      schedule: schedule._id,
      time: time,
      status: 'confirmed'
    });

    res.json({ message: "Booked successfully"});

    // Notification logic can go here (omitted for brevity/to avoid errors if model missing)

  } catch(error) {
    next(error);
  }
};
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

export const getClients = async (req, res) => {
  try {
    const schedules = await Schedule.find({ owner: req.user._id })
      .populate("slots.client", "name email");

    const clientsMap = new Map();

    schedules.forEach(schedule => {
      schedule.slots.forEach(slot => {
        if (slot.isBooked && slot.client) {
          const clientId = slot.client._id.toString();
          
          if (!clientsMap.has(clientId)) {
            clientsMap.set(clientId, {
              id: clientId,
              name: slot.client.name,
              email: slot.client.email,
              phone: "--", // Placeholder as User model doesn't have phone yet
              avatar: slot.client.name.charAt(0).toUpperCase(),
              status: "active", // Logic could be improved based on recent activity
              lastVisit: schedule.date,
              totalBookings: 0,
              color: "bg-purple-500" // varying colors could be added
            });
          }

          const client = clientsMap.get(clientId);
          client.totalBookings += 1;
          
          // Update last visit if this schedule is later
          if (new Date(schedule.date) > new Date(client.lastVisit)) {
             client.lastVisit = schedule.date;
          }
        }
      });
    });

    const clients = Array.from(clientsMap.values());
    res.json(clients);

  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ message: "Failed to fetch clients" });
  }
};
