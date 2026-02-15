import { useEffect, useState } from "react";
import api from "../services/api";

const OwnerBookings = () => {
  const [schedules, setSchedules] = useState([]);
   const [totalBookings, setTotalBookings] = useState(0);


  useEffect(() => {
    api.get("/schedules/owner/booked")
      .then(res => {
        setSchedules(res.data);

        // ✅ count total booked slots
        let count = 0;
        res.data.forEach(schedule => {
          schedule.slots.forEach(slot => {
            if (slot.client) count++;
          });
        });
        setTotalBookings(count);
      });
  }, []);

  const cancelBooking = async (scheduleId, time) => {
  await api.put("/schedules/owner/cancel", {
    scheduleId,
    time
  });

   // update UI instantly
  setSchedules(prev =>
    prev.map(schedule =>
      schedule.scheduleId === scheduleId
        ? {
            ...schedule,
            slots: schedule.slots.map(slot =>
              slot.time === time
                ? { ...slot, isBooked: false, client: null }
                : slot
            )
          }
        : schedule
    )
  );
};

 return (
  <div>
    <h2>My Booked Schedules</h2>
     <h3>Total Bookings: {totalBookings}</h3>

    {schedules.map(schedule => (
      <div key={schedule.scheduleId}>
        <h4>{schedule.date}</h4>

        {schedule.slots.map(slot => (
          <div key={slot.time} style={{ marginBottom: "8px" }}>
            <strong>{slot.time}</strong> —{" "}
            {slot.client
              ? `${slot.client.name} (${slot.client.email})`
              : "Not booked"}

            {slot.client && (
              <button
                style={{ marginLeft: "10px" }}
                onClick={() =>
                  cancelBooking(schedule.scheduleId, slot.time)
                }
              >
                Cancel
              </button>
            )}
          </div>
        ))}
      </div>
    ))}
  </div>
);
};

export default OwnerBookings;
