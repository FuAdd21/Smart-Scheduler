import { useEffect, useState, useMemo } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { 
  FiChevronLeft, 
  FiCalendar, 
  FiClock, 
  FiCheckCircle, 
  FiAlertCircle,
  FiLoader 
} from "react-icons/fi";

const AvailableSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const res = await api.get("/schedules");
      // Filter out past dates or fully booked days if needed, 
      // for now just sorting by date
      const sorted = res.data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setSchedules(sorted);
      
      // Select first available date by default if available
      if (sorted.length > 0 && !selectedDate) {
        setSelectedDate(sorted[0]);
      }
    } catch (err) {
      console.error("Failed to fetch schedules");
      setError("Could not load schedules. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = (schedule) => {
    setSelectedDate(schedule);
    setSelectedSlot(null); // Reset slot selection when date changes
    setBookingSuccess(false);
    setError("");
  };

  const handleSlotSelect = (timeCode) => {
    setSelectedSlot(timeCode);
    setError("");
  };

  const currentAvailableSlots = useMemo(() => {
    if (!selectedDate) return [];
    return selectedDate.slots.filter(slot => !slot.isBooked);
  }, [selectedDate]);

  const handleBookSlot = async () => {
    if (!selectedDate || !selectedSlot) return;

    setBookingInProgress(true);
    setError("");

    try {
      await api.post("/bookings", { 
        scheduleId: selectedDate._id, 
        time: selectedSlot 
      });
      
      setBookingSuccess(true);
      
      // Refresh data after short delay to show success state
      setTimeout(() => {
        fetchSchedules();
        // Keep success message but maybe clear selection or navigate?
        // For now, let user decide to book another or go back
      }, 2000);
      
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed. Please try again.");
      setBookingInProgress(false);
    }
  };

  // Format Helpers
  const formatDateDay = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const formatDateNum = (dateStr) => {
    const d = new Date(dateStr);
    return d.getDate();
  };

  const formatFullDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#030714] text-white">
      {/* Ambient Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-20%] h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(43,73,255,0.15)_0%,rgba(3,7,20,0)_70%)]" />
        <div className="absolute right-0 top-[20%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(43,222,255,0.08)_0%,rgba(3,7,20,0)_70%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <button 
            onClick={() => navigate('/dashboard')}
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-400 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            <FiChevronLeft className="transition-transform group-hover:-translate-x-0.5" />
            <span>Dashboard</span>
          </button>
          
          <div className="text-right">
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Book a Session
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Select a date and time that works for you.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex h-[400px] items-center justify-center rounded-3xl border border-white/10 bg-[#0a1122]">
            <div className="flex flex-col items-center gap-4">
              <FiLoader className="h-8 w-8 animate-spin text-[#4f67ff]" />
              <p className="animate-pulse text-sm text-slate-400">Loading schedules...</p>
            </div>
          </div>
        ) : schedules.length === 0 ? (
          <div className="flex h-[400px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-[#0a1122] text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
              <FiCalendar className="h-8 w-8 text-slate-500" />
            </div>
            <h3 className="text-xl font-medium text-white">No Availability</h3>
            <p className="mt-2 max-w-sm text-slate-400">
              There are currently no open slots available. Please check back later or contact us directly.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
            
            {/* Left Col: Date Selection */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-[#0a1122] p-6 shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#4f67ff]/10 blur-[50px] rounded-full pointer-events-none" />
                
                <h2 className="mb-6 flex items-center gap-3 text-lg font-semibold text-white">
                  <FiCalendar className="text-[#4f67ff]" />
                  <span>Select Date</span>
                </h2>

                <div className="grid grid-cols-1 gap-3">
                  {schedules.map((schedule) => {
                    const isSelected = selectedDate?._id === schedule._id;
                    const availableCount = schedule.slots.filter(s => !s.isBooked).length;
                    
                    if (availableCount === 0) return null;

                    return (
                      <button
                        key={schedule._id}
                        onClick={() => handleDateSelect(schedule)}
                        className={`group relative flex w-full items-center justify-between overflow-hidden rounded-xl border p-4 transition-all duration-300 ${
                          isSelected
                            ? "border-[#4f67ff] bg-[#4f67ff]/10 ring-1 ring-[#4f67ff]"
                            : "border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`flex flex-col items-center justify-center rounded-lg border px-3 py-1.5 ${
                            isSelected 
                              ? "border-[#4f67ff]/30 bg-[#4f67ff]/20 text-white" 
                              : "border-white/10 bg-white/5 text-slate-400 group-hover:text-white"
                          }`}>
                            <span className="text-[10px] uppercase tracking-wider">{formatDateDay(schedule.date)}</span>
                            <span className="text-xl font-bold">{formatDateNum(schedule.date)}</span>
                          </div>
                          <div className="text-left">
                            <p className={`font-medium ${isSelected ? "text-white" : "text-slate-300 group-hover:text-white"}`}>
                              {new Date(schedule.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                               {schedule.serviceName && (
                                 <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold text-white uppercase tracking-wider ${schedule.color?.replace('bg-', 'bg-') || 'bg-blue-500'}`}>
                                    {schedule.serviceName}
                                 </span>
                               )}
                               <p className="text-xs text-slate-500">
                                 {availableCount} slots • {schedule.duration || 30}m
                               </p>
                            </div>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-[#4f67ff] p-1 text-white shadow-[0_0_15px_rgba(79,103,255,0.5)]">
                            <FiCheckCircle className="h-4 w-4" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Col: Time Slots & Confirmation */}
            <div className="rounded-3xl border border-white/10 bg-[#0a1122]/80 p-8 backdrop-blur-xl md:p-10 shadow-2xl relative overflow-hidden">
             
              {bookingSuccess ? (
                <div className="flex h-full flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                  <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#2bdfb0]/10 ring-1 ring-[#2bdfb0]/30 shadow-[0_0_40px_rgba(43,223,176,0.2)]">
                    <FiCheckCircle className="h-10 w-10 text-[#2bdfb0]" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Booking Confirmed!</h2>
                  <p className="mt-4 max-w-md text-slate-400">
                    Your appointment for <span className="text-white font-medium">{formatFullDate(selectedDate.date)}</span> at <span className="text-white font-medium">{selectedSlot}</span> has been successfully scheduled.
                  </p>
                  <div className="mt-10 flex gap-4">
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition hover:bg-slate-200"
                    >
                      Go to Dashboard
                    </button>
                    <button
                      onClick={() => {
                        setBookingSuccess(false);
                        setSelectedSlot(null);
                        fetchSchedules();
                      }}
                      className="rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      Book Another
                    </button>
                  </div>
                </div>
              ) : (
                <>
                   <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[#4f67ff]/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

                  <div className="mb-8 border-b border-white/10 pb-8">
                    <h2 className="flex items-center gap-3 text-2xl font-bold text-white">
                      <FiClock className="text-[#4f67ff]" />
                      <span>{selectedDate ? formatFullDate(selectedDate.date) : "Select a date"}</span>
                    </h2>
                    <p className="mt-2 text-slate-400">
                      {selectedDate 
                        ? `Available time slots for this day. Time zone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}` 
                        : "Please select a date from the left to view available times."}
                    </p>
                  </div>

                  {error && (
                    <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
                      <FiAlertCircle className="h-5 w-5 shrink-0" />
                      <p>{error}</p>
                    </div>
                  )}

                  {!selectedDate ? (
                    <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
                      <p className="text-slate-500">No date selected</p>
                    </div>
                  ) : currentAvailableSlots.length === 0 ? (
                     <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
                      <p className="text-slate-500">No available slots for this date.</p>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                        {currentAvailableSlots.map((slot) => (
                          <button
                            key={slot.time}
                            onClick={() => handleSlotSelect(slot.time)}
                            className={`group relative overflow-hidden rounded-xl border py-3 text-sm font-medium transition-all duration-200 ${
                              selectedSlot === slot.time
                                ? "border-[#4f67ff] bg-[#4f67ff] text-white shadow-[0_0_25px_rgba(79,103,255,0.4)]"
                                : "border-white/10 bg-white/5 text-slate-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>

                      <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
                        <div className="text-center sm:text-left">
                           <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Selected Time</p>
                           <p className="mt-1 text-xl font-medium text-white">
                            {selectedSlot || "--:--"}
                           </p>
                        </div>

                        <button
                          onClick={handleBookSlot}
                          disabled={!selectedSlot || bookingInProgress}
                          className={`relative min-w-[200px] overflow-hidden rounded-full py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-all ${
                            !selectedSlot || bookingInProgress
                              ? "cursor-not-allowed bg-slate-800 text-slate-500"
                              : "bg-gradient-to-r from-[#4f67ff] to-[#3d54ff] hover:brightness-110 shadow-[0_0_30px_rgba(61,84,255,0.4)] hover:shadow-[0_0_45px_rgba(61,84,255,0.6)]"
                          }`}
                        >
                          {bookingInProgress ? (
                            <span className="flex items-center justify-center gap-2">
                              <FiLoader className="animate-spin" />
                              Processing...
                            </span>
                          ) : (
                            "Confirm Booking"
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableSchedules;
