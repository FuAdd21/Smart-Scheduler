import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiBell,
  FiChevronLeft,
  FiChevronRight,
  FiPhone,
  FiPlus,
  FiTrendingUp,
  FiUsers,
  FiCalendar,
  FiClock
} from "react-icons/fi";
import AuthContext from "../context/AuthContext";
import api from "../services/api.jsx";

const slotHeight = 84;
const dayStartHour = 8;
const dayEndHour = 18; // Extended to 6 PM covers more scenarios

// Event styles matching the design system
const eventStyles = [
  "bg-[#2f3270]/90 border-[#6070ff] text-[#e0e7ff] shadow-[0_4px_14px_rgba(96,112,255,0.3)]",
  "bg-[#1e293b]/90 border-[#334155] text-[#cbd5e1] shadow-lg",
  "bg-[#064e3b]/90 border-[#10b981] text-[#d1fae5] shadow-[0_4px_14px_rgba(16,185,129,0.3)]",
  "bg-[#4c1d95]/90 border-[#8b5cf6] text-[#ede9fe] shadow-[0_4px_14px_rgba(139,92,246,0.3)]",
];

const eventTitles = [
  "Consultation",
  "Haircut",
  "Full Service",
  "Check-up",
  "Therapy"
];

// Helper functions
const getStartOfDay = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime()) && typeof value === "string") {
    return new Date(`${value}T00:00:00`);
  }
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const getWeekStart = (date) => {
  const d = getStartOfDay(date);
  const day = d.getDay() || 7;
  d.setDate(d.getDate() - day + 1);
  return d;
};

const toMinutes = (time) => {
  const [h, m] = (time || "00:00").split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return dayStartHour * 60;
  return h * 60 + m;
};

const formatHourLabel = (hour24) => {
  const suffix = hour24 >= 12 ? "PM" : "AM";
  const hour = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour} ${suffix}`;
};

const formatRange = (startMinutes, duration = 60) => {
  const endMinutes = startMinutes + duration;
  const format = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const suffix = h >= 12 ? "PM" : "AM";
    const hour = h % 12 === 0 ? 12 : h % 12;
    return `${hour.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")} ${suffix}`;
  };
  return `${format(startMinutes)} - ${format(endMinutes)}`;
};

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weekStart, setWeekStart] = useState(getWeekStart(new Date()));

  useEffect(() => {
    let mounted = true;

    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings/my");
        if (mounted) setBookings(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Dashboard bookings fetch failed:", error);
        if (mounted) setBookings([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchBookings();
    return () => {
      mounted = false;
    };
  }, []);

  const today = useMemo(() => getStartOfDay(new Date()), []);
  const weekDates = useMemo(
    () =>
      Array.from({ length: 7 }, (_, idx) => {
        const d = new Date(weekStart);
        d.setDate(d.getDate() + idx);
        return d;
      }),
    [weekStart]
  );

  const enriched = useMemo(() => {
    return bookings
      .map((booking, idx) => {
        const scheduleDate = booking?.schedule?.date;
        if (!scheduleDate) return null;
        const date = getStartOfDay(scheduleDate);
        if (Number.isNaN(date.getTime())) return null;
        const startMinutes = toMinutes(booking.time);
        
        // Randomly assign style/label for demo if not present
        // In real app, these would come from booking type
        return {
          ...booking,
          date,
          startMinutes,
          label: eventTitles[idx % eventTitles.length],
          style: eventStyles[idx % eventStyles.length],
        };
      })
      .filter(Boolean);
  }, [bookings]);

  const weekStartTime = weekStart.getTime();
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  const weekEndTime = weekEnd.getTime();

  const weekEvents = useMemo(
    () =>
      enriched.filter((event) => {
        const time = event.date.getTime();
        return time >= weekStartTime && time <= weekEndTime;
      }),
    [enriched, weekStartTime, weekEndTime]
  );

  const todayEvents = useMemo(
    () =>
      enriched
        .filter((event) => event.date.toDateString() === today.toDateString())
        .sort((a, b) => a.startMinutes - b.startMinutes),
    [enriched, today]
  );

  // Stats Calculations
  const thisWeekCount = weekEvents.length;
  // Use mock growth data for visual fidelity if real data is scarce
  const growth = 18; 
  const totalRevenue = 12450; // Mocked for design match
  const uniqueDatesCount = 3; // Mocked

  const weekRangeLabel = `${weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${weekEnd.toLocaleDateString("en-US", { month: "short", day: "numeric" })}, ${weekEnd.getFullYear()}`;

  // Mini Calendar logic
  const daysInMonth = new Date(weekStart.getFullYear(), weekStart.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(weekStart.getFullYear(), weekStart.getMonth(), 1).getDay();
  const calendarDays = Array.from({ length: 35 }, (_, i) => {
    const day = i - firstDayOfMonth + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });

  return (
    <div className="h-full w-full bg-[#0b1021] text-white">
      <div className="mx-auto grid h-full max-w-[1600px] grid-cols-1 gap-8 p-6 xl:grid-cols-[1fr_360px] xl:p-8">
        
        {/* Main Content Area */}
        <section className="flex flex-col gap-8">
          
          {/* Header */}
          <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Good morning, {user?.name?.split(" ")[0] || "User"}
              </h1>
              <p className="mt-1 text-slate-400">
                Here&apos;s what&apos;s happening in your schedule today.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-xl border border-[#1f2745] bg-[#10152b] p-1">
                <button
                   onClick={() => {
                    const d = new Date(weekStart);
                    d.setDate(d.getDate() - 7);
                    setWeekStart(d);
                   }}
                   className="rounded-lg p-2 text-slate-400 hover:bg-[#1a2142] hover:text-white"
                >
                  <FiChevronLeft />
                </button>
                <span className="min-w-[140px] text-center text-sm font-medium text-slate-200">
                  {weekRangeLabel}
                </span>
                 <button
                   onClick={() => {
                    const d = new Date(weekStart);
                    d.setDate(d.getDate() + 7);
                    setWeekStart(d);
                   }}
                   className="rounded-lg p-2 text-slate-400 hover:bg-[#1a2142] hover:text-white"
                >
                  <FiChevronRight />
                </button>
              </div>

              <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#1f2745] bg-[#10152b] text-slate-400 hover:bg-[#1a2142] hover:text-white">
                <FiBell className="h-5 w-5" />
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#ef4444] ring-2 ring-[#10152b]" />
              </button>
            </div>
          </header>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-4">
            {[
              { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, change: "+12%", trend: "up", color: "bg-[#1a2142]" },
              { label: "Appointments Today", value: `${todayEvents.length}`, sub: "Scheduled", change: "", trend: "neutral", color: "bg-[#1a2142]" },
              { label: "New Clients", value: `+${uniqueDatesCount}`, change: "+5%", trend: "up", color: "bg-indigo-500/10 border-indigo-500/20" },
              { label: "Growth %", value: `${growth}%`, change: "+2%", trend: "up", color: "bg-emerald-500/10 border-emerald-500/20" },
            ].map((stat, idx) => (
              <div key={idx} className={`relative min-w-0 rounded-2xl border border-[#1f2745] p-5 ${stat.color} flex flex-col justify-between min-h-[140px]`}>
                <p className="text-sm font-medium text-slate-400 whitespace-nowrap">{stat.label}</p>
                <div className="mt-2 flex flex-col gap-1">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-2xl 2xl:text-3xl font-bold text-white leading-tight">{stat.value}</span>
                    {stat.sub && <span className="text-sm text-slate-400 whitespace-nowrap">{stat.sub}</span>}
                  </div>
                  {stat.change && (
                    <span className={`flex items-center text-xs font-medium ${stat.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {stat.trend === 'up' ? <FiTrendingUp className="mr-1" /> : null}
                      {stat.change}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="flex-1 overflow-hidden rounded-3xl border border-[#1f2745] bg-[#10152b] shadow-xl">
            {/* Calendar Header with Days */}
            <div className="grid grid-cols-[80px_ repeat(7,1fr)] border-b border-[#1f2745]">
              <div className="border-r border-[#1f2745] p-4 text-center text-xs font-semibold uppercase text-slate-500">
                Time
              </div>
              {weekDates.map((date) => {
                const isToday = date.toDateString() === today.toDateString();
                return (
                  <div key={date.toString()} className={`border-r border-[#1f2745] p-4 text-center last:border-r-0 ${isToday ? 'bg-[#1a2142]/50' : ''}`}>
                    <p className={`text-xs font-semibold uppercase ${isToday ? 'text-[#4f67ff]' : 'text-slate-500'}`}>
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </p>
                    <p className={`mt-1 text-lg font-bold ${isToday ? 'text-white' : 'text-slate-400'}`}>
                      {date.getDate()}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Calendar Body */}
            <div className="relative h-[600px] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-[80px_repeat(7,1fr)]">
                {/* Time Column */}
                <div className="border-r border-[#1f2745] bg-[#10152b]">
                   {Array.from({ length: dayEndHour - dayStartHour }).map((_, idx) => (
                    <div key={idx} className="h-[84px] border-b border-[#1f2745] px-2 py-2 text-right text-xs text-slate-500">
                      {formatHourLabel(dayStartHour + idx)}
                    </div>
                   ))}
                </div>

                {/* Days Columns */}
                 {weekDates.map((day, dayIndex) => (
                  <div key={day.toString()} className="relative border-r border-[#1f2745] last:border-r-0">
                    {/* Background Grid Lines */}
                    {Array.from({ length: dayEndHour - dayStartHour }).map((_, idx) => (
                      <div key={idx} className="h-[84px] border-b border-[#1f2745/50]" />
                    ))}

                    {/* Events */}
                    {weekEvents
                    .filter((event) => event.date.toDateString() === day.toDateString())
                    .map((event) => {
                      const top = ((event.startMinutes - dayStartHour * 60) / 60) * slotHeight;
                      if (top < 0) return null; // simplistic clipping
                      
                      return (
                        <div
                          key={event._id}
                          className={`absolute left-1 right-1 z-10 rounded-lg p-2.5 text-xs transition-transform hover:scale-[1.02] ${event.style}`}
                          style={{ top: `${top}px`, height: `${slotHeight - 4}px` }}
                        >
                          <p className="font-bold">{event.label}</p>
                          <p className="mt-0.5 truncate opacity-90">{event?.schedule?.owner?.name || "Client"}</p>
                          <p className="mt-0.5 opacity-75">{formatRange(event.startMinutes)}</p>
                        </div>
                      );
                    })}
                  </div>
                 ))}
              </div>
            </div>
          </div>
        </section>

        {/* Right Sidebar */}
        <aside className="flex flex-col gap-8">
          
          {/* Upcoming List */}
          <div className="flex flex-col gap-6">
             <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Upcoming Today</h2>
              <span className="text-sm font-medium text-slate-500">
                {new Date().toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}
              </span>
             </div>

             <div className="flex flex-col gap-4">
              {loading ? (
                <div className="p-4 text-center text-slate-500">Loading...</div>
              ) : todayEvents.length === 0 ? (
                 <div className="rounded-2xl border border-[#1f2745] border-dashed p-6 text-center text-slate-500">
                  No appointments today.
                 </div>
              ) : (
                todayEvents.slice(0, 4).map((event, idx) => (
                  <div key={idx} className="group flex items-start gap-4 rounded-2xl border border-[#1f2745] bg-[#10152b] p-4 transition-all hover:bg-[#161d37]">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1f2745] text-sm font-bold text-white group-hover:bg-[#4f67ff]">
                       {(event?.schedule?.owner?.name || "C").charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-white">{event?.schedule?.owner?.name || "Client Name"}</p>
                      <p className="text-xs text-slate-400">{formatRange(event.startMinutes)}</p>
                      <div className="mt-2 inline-flex items-center rounded-full bg-[#1f2745] px-2.5 py-0.5 text-[10px] font-medium text-slate-300">
                        {event.label}
                      </div>
                    </div>
                  </div>
                ))
              )}
             </div>
          </div>

          {/* Mini Calendar */}
          <div className="rounded-3xl border border-[#1f2745] bg-[#10152b] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-white">
                {weekStart.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </h3>
              <div className="flex gap-1">
                 <FiChevronLeft className="cursor-pointer text-slate-400 hover:text-white" />
                 <FiChevronRight className="cursor-pointer text-slate-400 hover:text-white" />
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-y-4 text-center text-xs">
              {['M','T','W','T','F','S','S'].map(d => (
                <span key={d} className="font-semibold text-slate-500">{d}</span>
              ))}
              {calendarDays.map((d, i) => (
                <span 
                  key={i} 
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    d === new Date().getDate() ? 'bg-[#4f67ff] font-bold text-white' : 
                    d ? 'text-slate-300 hover:bg-[#1f2745]' : ''
                  }`}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Add Button */}
           <Link
            to="/create-schedule"
            className="group flex items-center justify-center gap-2 rounded-2xl bg-[#4f67ff] py-4 font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-[#4358e0] hover:shadow-indigo-500/30"
          >
            <FiPlus className="h-5 w-5 transition-transform group-hover:rotate-90" />
            <span>New Schedule</span>
          </Link>

        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
