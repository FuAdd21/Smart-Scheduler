import { useEffect, useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCalendar, FiClock, FiCheckCircle, FiXCircle, FiLoader, FiAlertCircle } from "react-icons/fi";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/bookings/my")
      .then(res => setBookings(res.data))
      .catch(err => console.error("Failed to fetch bookings", err))
      .finally(() => setLoading(false));
  }, []);

  const cancelHandler = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await api.delete(`/bookings/${id}`);
      setBookings(bookings.filter(b => b._id !== id));
    } catch (error) {
       alert("Failed to cancel booking");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1021] font-sans text-white p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
           <div>
              <button 
                onClick={() => navigate('/dashboard')} 
                className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-2 text-sm font-medium"
              >
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Back to Dashboard
              </button>
              <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
              <p className="text-slate-400 mt-1">Manage your upcoming appointments and history.</p>
           </div>
           
           <Link 
             to="/schedules" 
             className="flex items-center gap-2 rounded-xl bg-[#4f67ff] px-6 py-2.5 font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-[#4358e0] hover:shadow-indigo-500/30"
           >
             <FiClock className="h-5 w-5" />
             <span>Book New Session</span>
           </Link>
        </div>

        {loading ? (
           <div className="flex justify-center items-center py-32">
              <FiLoader className="w-10 h-10 animate-spin text-[#4f67ff]" />
           </div>
        ) : bookings.length === 0 ? (
           <div className="rounded-2xl border border-[#1f2745] bg-[#10152b] p-12 text-center">
              <div className="mx-auto w-16 h-16 bg-[#1f2745] rounded-full flex items-center justify-center mb-6">
                <FiClock className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Bookings Found</h3>
              <p className="text-slate-400 max-w-md mx-auto mb-8">You haven't booked any appointments yet. Check out the available slots to get started.</p>
              <Link 
                to="/schedules" 
                className="inline-flex items-center gap-2 rounded-xl border border-[#4f67ff] px-6 py-3 font-bold text-[#4f67ff] hover:bg-[#4f67ff] hover:text-white transition-all"
              >
                 Browse Schedule
              </Link>
           </div>
        ) : (
           <div className="grid grid-cols-1 gap-4">
              {bookings.map(b => (
                <div key={b._id} className="group relative overflow-hidden rounded-2xl border border-[#1f2745] bg-[#10152b] p-6 transition-all hover:bg-[#161d37] hover:border-[#4f67ff]/30">
                   <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                      
                      <div className="flex items-start gap-5">
                         {/* Date Card */}
                         <div className="flex flex-col items-center justify-center rounded-xl border border-[#4f67ff]/30 bg-[#4f67ff]/10 px-4 py-3 min-w-[80px]">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#4f67ff]">
                               {new Date(b.schedule.date).toLocaleDateString('en-US', { month: 'short' })}
                            </span>
                            <span className="text-2xl font-bold text-white">
                               {new Date(b.schedule.date).getDate()}
                            </span>
                         </div>
                         
                         <div>
                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#4f67ff] transition-colors">
                               {b.schedule.serviceName || "Standard Session"}
                            </h3>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-400">
                               <div className="flex items-center gap-1.5">
                                  <FiClock className="text-[#4f67ff]" />
                                  <span>{b.time}</span>
                               </div>
                               <div className="flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                                  <span>{new Date(b.schedule.date).toLocaleDateString()}</span>
                               </div>
                               <div className="flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                                  <span>45 min</span>
                               </div>
                            </div>
                            
                            <div className="mt-3 flex items-center gap-2">
                               <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                                  <FiCheckCircle className="w-3 h-3" />
                                  CONFIRMED
                               </span>
                            </div>
                         </div>
                      </div>

                      <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between gap-3">
                         <button 
                           onClick={() => cancelHandler(b._id)}
                           className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all"
                         >
                           <FiXCircle className="w-4 h-4" />
                           Cancel
                         </button>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
