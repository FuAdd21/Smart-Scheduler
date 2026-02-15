import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiClock, FiCalendar, FiArrowRight, FiLoader } from "react-icons/fi";
import axios from "axios";

const LiveAvailability = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch available schedules from the backend
    axios
      .get("http://localhost:5000/api/schedules")
      .then((res) => {
        // Flatten and filter to get only available slots
        const availableSlots = res.data.data
          .flatMap((schedule) =>
            schedule.slots
              .filter((slot) => !slot.isBooked)
              .map((slot) => ({
                date: schedule.date,
                time: slot.time,
                serviceName: schedule.serviceName || "Standard Session",
                serviceType: schedule.serviceType || "standard",
                color: schedule.color || "bg-blue-500",
                duration: schedule.duration || 30,
                ownerName: schedule.owner?.name || "Professional",
                ownerEmail: schedule.owner?.email || "",
              }))
          )
          .slice(0, 6); // Show only first 6 slots

        setSlots(availableSlots);
      })
      .catch((err) => console.error("Failed to fetch slots:", err))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <FiLoader className="w-8 h-8 animate-spin text-[#4f67ff]" />
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="rounded-2xl border border-[#1a243e] bg-[#0b1325] p-12 text-center">
        <FiCalendar className="w-12 h-12 mx-auto text-slate-600 mb-4" />
        <p className="text-slate-400">No available slots at the moment. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {slots.map((slot, index) => (
        <Link
          key={index}
          to="/schedules"
          className="group relative overflow-hidden rounded-2xl border border-[#1a243e] bg-[#0b1325] p-6 transition-all hover:bg-[#121e3c] hover:border-[#4f67ff]/50 hover:-translate-y-1"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4f67ff]/10 to-transparent" />
          </div>

          <div className="relative">
            {/* Service Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-white ${slot.color}`}>
                {slot.serviceName}
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <FiClock className="w-3 h-3" />
                {slot.duration}m
              </span>
            </div>

            {/* Date & Time */}
            <div className="mb-4">
              <p className="text-lg font-bold text-white mb-1">{slot.time}</p>
              <p className="text-sm text-slate-400 flex items-center gap-2">
                <FiCalendar className="w-4 h-4 text-[#4f67ff]" />
                {formatDate(slot.date)}
              </p>
            </div>

            {/* Owner Profile */}
            <div className="mb-4 flex items-center gap-3 pb-4 border-b border-[#1a243e]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#4f67ff] to-[#7b8fff] text-white font-bold text-sm">
                {slot.ownerName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{slot.ownerName}</p>
                <p className="text-xs text-slate-500">Service Provider</p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-[#1a243e]">
              <span className="text-sm font-medium text-[#4f67ff] group-hover:text-white transition-colors">
                Book Now
              </span>
              <FiArrowRight className="w-4 h-4 text-[#4f67ff] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default LiveAvailability;
