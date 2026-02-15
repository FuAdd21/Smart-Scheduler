import { useState, useEffect } from "react";
import api from "../services/api";
import { FiSearch, FiFilter, FiMoreVertical, FiMail, FiPhone, FiCalendar, FiLoader, FiAlertCircle } from "react-icons/fi";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const { data } = await api.get("/schedules/owner/clients");
      setClients(data);
    } catch (err) {
      console.error("Failed to fetch clients:", err);
      setError("Could not load client list.");
    } finally {
      setLoading(false);
    }
  };

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || client.status === filter;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return "Never";
    return new Date(dateStr).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="flex h-full flex-col gap-8 text-white">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="mt-1 text-slate-400">
            Manage your client base and view their history.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-[#4f67ff] px-4 py-2.5 font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-[#4358e0] hover:shadow-indigo-500/30">
          <FiCalendar className="h-5 w-5" />
          <span>Add Client</span>
        </button>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
           <FiLoader className="w-10 h-10 animate-spin text-[#4f67ff]" />
        </div>
      ) : error ? (
        <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-200">
           <FiAlertCircle className="w-5 h-5" />
           {error}
        </div>
      ) : (
        <>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { label: "Total Clients", value: clients.length, change: "+12%", trend: "up" },
              { label: "Active Now", value: clients.filter(c => c.status === 'active').length || 0, change: "+5%", trend: "up" },
              { label: "New This Month", value: "0", change: "-2%", trend: "down" },
            ].map((stat, idx) => (
              <div key={idx} className="rounded-2xl border border-[#1f2745] bg-[#10152b] p-5">
                <p className="text-sm font-medium text-slate-400">{stat.label}</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                  <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between rounded-2xl border border-[#1f2745] bg-[#10152b] p-4">
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-[#1f2745] bg-[#0b1021] py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none focus:border-[#4f67ff] focus:ring-1 focus:ring-[#4f67ff]"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 rounded-xl border border-[#1f2745] bg-[#0b1021] px-4 py-2.5 text-sm font-medium text-slate-300 hover:bg-[#1f2745] hover:text-white">
                <FiFilter className="h-4 w-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Client List */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {filteredClients.length === 0 ? (
               <div className="col-span-full py-12 text-center text-slate-500">
                  <p>No clients found.</p>
               </div>
            ) : filteredClients.map((client) => (
              <div key={client.id} className="group relative flex flex-col gap-4 rounded-2xl border border-[#1f2745] bg-[#10152b] p-6 transition-all hover:bg-[#161d37]">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white ${client.color || 'bg-blue-600'}`}>
                      {client.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-white group-hover:text-[#4f67ff] transition-colors">{client.name}</h3>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{client.status}</p>
                    </div>
                  </div>
                  <button className="rounded-lg p-2 text-slate-400 hover:bg-[#1f2745] hover:text-white">
                    <FiMoreVertical className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <FiMail className="h-4 w-4 shrink-0" />
                    <span className="truncate">{client.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <FiPhone className="h-4 w-4 shrink-0" />
                    <span>{client.phone}</span>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-[#1f2745] flex items-center justify-between text-xs">
                  <div className="text-slate-500">
                    Last visit: <span className="text-slate-300">{formatDate(client.lastVisit)}</span>
                  </div>
                  <div className="text-slate-500">
                    Bookings: <span className="font-bold text-white">{client.totalBookings}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Clients;
