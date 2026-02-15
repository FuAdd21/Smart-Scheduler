import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { FiClock, FiCalendar, FiArrowLeft, FiCheck, FiMoreHorizontal } from "react-icons/fi";

const CreateSchedule = () => {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [slotDuration, setSlotDuration] = useState(30);
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState("consultation");
  const navigate = useNavigate();

  const services = [
    { id: "consultation", name: "Quick Consultation", duration: 15, color: "bg-blue-500" },
    { id: "standard", name: "Standard Session", duration: 30, color: "bg-purple-500" },
    { id: "premium", name: "Premium Deep Dive", duration: 60, color: "bg-emerald-500" },
  ];

  const handleServiceSelect = (service) => {
    setSelectedService(service.id);
    setSlotDuration(service.duration);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);

    if (end <= start) {
      alert("End time must be after start time!");
      setLoading(false);
      return;
    }

    const service = services.find(s => s.id === selectedService);

    try {
      await api.post("/schedules", {
        date,
        startTime,
        endTime,
        slotDuration,
        duration: slotDuration, // Backend expects 'duration' field
        // Core Booking Integrity Fields (Phase 1)
        serviceName: service.name,
        serviceType: service.id,
        color: service.color
      });
      navigate("/dashboard");
    } catch (error) {
       console.error("Failed to create schedule", error);
       alert(error.response?.data?.message || "Failed to create schedule");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1021] text-white p-4 sm:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="group mb-8 flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1f2745] bg-[#10152b] transition-colors group-hover:bg-[#4f67ff] group-hover:border-[#4f67ff]">
            <FiArrowLeft className="h-4 w-4" />
          </div>
          <span>Back to Dashboard</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Create Availability</h1>
              <p className="mt-2 text-slate-400">Configure your schedule for upcoming sessions.</p>
            </div>

            <div className="rounded-2xl border border-[#1f2745] bg-[#10152b] p-6 sm:p-8 shadow-xl">
              <form onSubmit={submitHandler} className="space-y-8">
                
                {/* Service Type Selection */}
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-4">Select Service Type</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        onClick={() => handleServiceSelect(service)}
                        className={`cursor-pointer relative p-4 rounded-xl border transition-all ${
                          selectedService === service.id
                            ? "bg-[#1f2937] border-[#4f67ff] shadow-[0_0_20px_rgba(79,103,255,0.2)]"
                            : "bg-[#0b1021] border-[#1f2745] hover:border-slate-600"
                        }`}
                      >
                        {selectedService === service.id && (
                          <div className="absolute top-2 right-2 text-[#4f67ff]">
                            <FiCheck className="w-4 h-4" />
                          </div>
                        )}
                        <div className={`w-2 h-2 rounded-full mb-3 ${service.color}`} />
                        <h3 className="font-bold text-sm">{service.name}</h3>
                        <p className="text-xs text-slate-400 mt-1">{service.duration} min</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Date Picker */}
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Select Date</label>
                  <div className="relative">
                    <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="date"
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      required
                      className="w-full rounded-xl border border-[#1f2745] bg-[#0b1021] py-3.5 pl-11 pr-4 text-white placeholder-slate-500 outline-none focus:border-[#4f67ff] focus:ring-1 focus:ring-[#4f67ff] transition-all"
                    />
                  </div>
                </div>

                {/* Time Range */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">Start Time</label>
                      <div className="relative">
                        <FiClock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="time"
                          value={startTime}
                          onChange={e => setStartTime(e.target.value)}
                          required
                          className="w-full rounded-xl border border-[#1f2745] bg-[#0b1021] py-3.5 pl-11 pr-4 text-white placeholder-slate-500 outline-none focus:border-[#4f67ff] focus:ring-1 focus:ring-[#4f67ff] transition-all"
                        />
                      </div>
                   </div>
                   <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">End Time</label>
                      <div className="relative">
                        <FiClock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="time"
                          value={endTime}
                          onChange={e => setEndTime(e.target.value)}
                          required
                          className="w-full rounded-xl border border-[#1f2745] bg-[#0b1021] py-3.5 pl-11 pr-4 text-white placeholder-slate-500 outline-none focus:border-[#4f67ff] focus:ring-1 focus:ring-[#4f67ff] transition-all"
                        />
                      </div>
                   </div>
                </div>

                {/* Duration Override */}
                <div>
                   <div className="flex items-center justify-between mb-2">
                     <label className="block text-sm font-bold text-slate-300">Duration Override</label>
                     <span className="text-xs text-slate-500">Optional</span>
                   </div>
                   <div className="flex items-center gap-3">
                      {[15, 30, 45, 60].map((duration) => (
                        <button
                          key={duration}
                          type="button"
                          onClick={() => setSlotDuration(duration)}
                          className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                            slotDuration === duration 
                              ? 'bg-[#4f67ff] text-white border-[#4f67ff] shadow-lg shadow-indigo-500/20' 
                              : 'bg-[#0b1021] text-slate-400 border-[#1f2745] hover:border-slate-500 hover:text-white'
                          }`}
                        >
                          {duration}m
                        </button>
                      ))}
                   </div>
                </div>

                <div className="pt-6 border-t border-[#1f2745]">
                   <button 
                     type="submit" 
                     disabled={loading}
                     className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:-translate-y-0.5 ${
                        loading 
                          ? 'bg-[#1f2745] text-slate-500 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-[#4f67ff] to-[#6b67ff] text-white hover:shadow-indigo-500/30'
                     }`}
                   >
                     {loading ? 'Creating...' : 'Publish Availability'}
                   </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Preview/Tips */}
          <div className="space-y-6">
             <div className="rounded-2xl border border-[#1f2745] bg-[#10152b] p-6">
                <h3 className="font-bold text-white mb-4">Preview</h3>
                <div className="bg-[#0b1021] rounded-xl p-4 border border-[#1f2745]">
                   <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${services.find(s => s.id === selectedService)?.color} text-white`}>
                        {services.find(s => s.id === selectedService)?.name[0]}
                      </div>
                      <div>
                         <p className="font-bold text-sm text-white">{services.find(s => s.id === selectedService)?.name}</p>
                         <p className="text-xs text-slate-400">{slotDuration} min • {startTime || "09:00"} - {endTime || "17:00"}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-2 text-xs text-[#4f67ff] font-medium bg-[#4f67ff]/10 p-2 rounded-lg">
                      <FiCalendar className="w-3 h-3" />
                      {date ? new Date(date).toLocaleDateString() : "Select a date"}
                   </div>
                </div>
             </div>

             <div className="rounded-2xl border border-[#1f2745] bg-[#10152b] p-6">
                <h3 className="font-bold text-white mb-4">Quick Tips</h3>
                <ul className="space-y-3 text-sm text-slate-400">
                   <li className="flex items-start gap-2">
                     <span className="text-[#4f67ff] mt-1">•</span>
                     Set consistent hours to build routine with clients.
                   </li>
                   <li className="flex items-start gap-2">
                     <span className="text-[#4f67ff] mt-1">•</span>
                     Add buffer times between premium sessions for preparation.
                   </li>
                   <li className="flex items-start gap-2">
                     <span className="text-[#4f67ff] mt-1">•</span>
                     Double check timezones when booking for international clients.
                   </li>
                </ul>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateSchedule;
