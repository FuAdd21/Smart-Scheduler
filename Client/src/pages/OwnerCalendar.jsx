import { useEffect, useState } from "react";
import api from "../services/api";
import BookingModal from "../components/BookingModal";
import StatsCard from "../components/StatsCard";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaCheck,
  FaHourglassHalf,
  FaDollarSign,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
} from "react-icons/fa";

const days = [
  "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
];

const getWeekStart = (date) => {
  const d = new Date(date);
  const day = d.getDay() || 7;
  d.setDate(d.getDate() - day + 1);
  return d;
};

const OwnerCalendar = () => {
  const [schedules, setSchedules] = useState([]);
  const [weekStart, setWeekStart] = useState(getWeekStart(new Date()));
  const [selectedSlot, setSelectedSlot] = useState(null);
  const navigate = useNavigate();

  const fetchData = () => {
    api.get("/schedules/owner/booked").then((res) => setSchedules(res.data));
  };

  useEffect(fetchData, []);

  const cancelBooking = async (slot) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    
    try {
      await api.post("/schedules/cancel", {
        scheduleId: slot.scheduleId,
        time: slot.time,
      });
      setSelectedSlot(null);
      fetchData();
    } catch (error) {
      alert("Failed to cancel booking");
    }
  };

  const stats = [
    { title: "Total Appointments", value: 32, icon: FaCalendarAlt, color: "text-blue-400" },
    { title: "Completed", value: 20, icon: FaCheck, color: "text-emerald-400" },
    { title: "Pending", value: 12, icon: FaHourglassHalf, color: "text-yellow-400" },
    { title: "Revenue", value: "$1,200", icon: FaDollarSign, color: "text-purple-400" },
  ];

  return (
    <div className="min-h-screen bg-[#0b1021] font-sans text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <button 
                onClick={() => navigate('/dashboard')} 
                className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-2 text-sm font-medium"
            >
              <FaChevronLeft className="group-hover:-translate-x-1 transition-transform w-3 h-3" />
              Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold tracking-tight">Reports & Calendar</h1>
          </div>
          <Link 
            to="/create-schedule" 
            className="flex items-center gap-2 rounded-xl bg-[#4f67ff] px-6 py-2.5 font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-[#4358e0] hover:shadow-indigo-500/30"
          >
            <FaClock className="h-4 w-4" />
            <span>Create Slots</span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <div key={i} className="rounded-2xl border border-[#1f2745] bg-[#10152b] p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">{s.title}</p>
                <p className="text-2xl font-bold text-white mt-1">{s.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl bg-[#1f2937] flex items-center justify-center ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>

        {/* Calendar Card */}
        <div className="rounded-2xl border border-[#1f2745] bg-[#10152b] overflow-hidden">
          <div className="p-6 border-b border-[#1f2745] flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <FaCalendarAlt className="text-[#4f67ff]" />
              {weekStart.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            
            <div className="flex gap-2">
              <button
                onClick={() => setWeekStart(new Date(weekStart.setDate(weekStart.getDate() - 7)))}
                className="p-2 hover:bg-[#1f2937] rounded-lg transition-colors text-slate-400 hover:text-white"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={() => setWeekStart(new Date(weekStart.setDate(weekStart.getDate() + 7)))}
                className="p-2 hover:bg-[#1f2937] rounded-lg transition-colors text-slate-400 hover:text-white"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>

          {/* Days Header */}
          <div className="grid grid-cols-7 border-b border-[#1f2745] bg-[#0b1021]/50">
            {days.map((day) => (
              <div key={day} className="py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 divide-x divide-[#1f2745] min-h-[500px] bg-[#0b1021]/20">
            {days.map((day, index) => {
              const currentDate = new Date(weekStart);
              currentDate.setDate(weekStart.getDate() + index);
              
              const isToday = new Date().toDateString() === currentDate.toDateString();

              // Flatten slots for this day
              const daySlots = schedules
                .filter(s => new Date(s.date).toDateString() === currentDate.toDateString())
                .flatMap(s => s.slots.map(slot => ({ ...slot, scheduleId: s.scheduleId })));

              return (
                <div key={day} className="flex flex-col">
                  <div className={`py-3 text-center border-b border-[#1f2745] ${isToday ? 'bg-[#4f67ff]/10' : ''}`}>
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${isToday ? 'bg-[#4f67ff] text-white shadow-lg shadow-indigo-500/40' : 'text-slate-400'}`}>
                      {currentDate.getDate()}
                    </span>
                  </div>
                  
                  <div className="flex-1 p-2 space-y-2">
                    {daySlots.length === 0 && (
                       <div className="h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                         <span className="text-xs text-slate-700 font-medium select-none">+ Add</span>
                       </div>
                    )}
                    {daySlots.map((slot) => (
                      <div
                        key={slot.time + slot.scheduleId}
                        onClick={() => slot.client && setSelectedSlot(slot)}
                        className={`group p-2.5 rounded-xl text-xs font-medium border cursor-pointer transition-all hover:-translate-y-0.5 relative overflow-hidden ${
                          slot.client
                            ? "bg-[#4f67ff]/10 border-[#4f67ff]/30 text-white hover:bg-[#4f67ff]/20 hover:border-[#4f67ff]/50" // Booked
                            : "bg-[#1f2937]/50 border-[#1f2745] text-slate-500 hover:bg-[#1f2937] hover:text-slate-300" // Open
                        }`}
                      >
                        {slot.client && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#4f67ff]" />}
                        
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold tracking-tight">{slot.time}</span>
                          {slot.client && <FaCheck className="w-3 h-3 text-[#4f67ff]" />}
                        </div>
                        {slot.client ? (
                          <div className="truncate font-semibold text-[#cad4e0]">
                            {slot.client.name}
                          </div>
                        ) : (
                          <span className="text-slate-600 italic">Open Slot</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal */}
        {selectedSlot && (
           <BookingModal
             slot={selectedSlot}
             onClose={() => setSelectedSlot(null)}
             onCancel={() => cancelBooking(selectedSlot)}
           />
        )}
      </div>
    </div>
  );
};

export default OwnerCalendar;
