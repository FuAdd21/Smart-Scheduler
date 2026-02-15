import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import {
  FiClock,
  FiGrid,
  FiCalendar,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiMessageSquare
} from "react-icons/fi";
import AuthContext from "../context/AuthContext";

const Sidebar = ({ isOpen, setIsOpen, isCollapsed, setIsCollapsed }) => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: FiGrid },
    { label: "My Bookings", path: "/my-bookings", icon: FiClock, clientOnly: true },
    { label: "Browse Slots", path: "/schedules", icon: FiCalendar, clientOnly: true },
    { label: "Calendar", path: "/create-schedule", icon: FiCalendar, ownerOnly: true },
    { label: "Clients", path: "/clients", icon: FiUsers, ownerOnly: true },
    { label: "Messages", path: "/messages", icon: FiMessageSquare, ownerOnly: true },
    { label: "Reports", path: "/owner/calendar", icon: FiBarChart2, ownerOnly: true },
    { label: "Settings", path: "/settings", icon: FiSettings },
  ];

  const handleToggleCollapse = () => {
    if (setIsCollapsed) {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-30 border-r border-[#1f2745] bg-[#0b1021] transform transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${isCollapsed ? "w-[88px]" : "w-[280px]"}`}
      >
        <div className="relative flex h-full flex-col p-4">
          
          {/* Collapse Toggle Button (Desktop Only) */}
          <button 
            onClick={handleToggleCollapse}
            className="absolute -right-3 top-8 hidden h-6 w-6 items-center justify-center rounded-full border border-[#1f2745] bg-[#1a2142] text-white shadow-lg lg:flex hover:bg-[#4f67ff] transition-colors z-50"
          >
            {isCollapsed ? <FiChevronRight className="h-4 w-4" /> : <FiChevronLeft className="h-4 w-4" />}
          </button>

          {/* Brand */}
          <div className={`mb-8 flex items-center ${isCollapsed ? "justify-center" : "gap-4 px-2"}`}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#4f67ff] text-white shadow-[0_0_30px_rgba(79,103,255,0.3)]">
              <FiClock className="h-5 w-5" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0 overflow-hidden whitespace-nowrap">
                <p className="text-lg font-bold leading-none text-white">
                  SmartScheduler
                </p>
                <p className="mt-1 text-[10px] font-medium text-[#64748b] uppercase tracking-wider">
                  Admin Panel
                </p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              // Hide owner-only items from clients
              if (item.ownerOnly && user?.role !== "owner") return null;
              // Hide client-only items from owners
              if (item.clientOnly && user?.role === "owner") return null;
              
              const Icon = item.icon;
              const pathOnly = item.path.split("?")[0];
              const isActive = location.pathname === pathOnly;

              return (
                <Link
                  key={`${item.label}-${item.path}`}
                  to={item.path}
                  title={isCollapsed ? item.label : ""}
                  className={`group flex items-center rounded-xl transition-all duration-200 ${
                    isCollapsed ? "justify-center px-0 py-3" : "gap-3 px-4 py-3.5"
                  } ${
                    isActive
                      ? "bg-[#1a2142] text-[#6f79ff] shadow-[0_0_20px_rgba(111,121,255,0.1)]"
                      : "text-[#94a3b8] hover:bg-[#161d37] hover:text-white"
                  }`}
                >
                  <Icon className={`h-5 w-5 transition-transform ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                  {!isCollapsed && (
                    <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer / User Profile */}
          <div className="mt-auto pt-6 border-t border-[#1f2745]">
            <div className={`mb-4 rounded-2xl border border-[#1f2745] bg-[#10152b] ${isCollapsed ? "p-2 justify-center flex" : "p-3"}`}>
              <div className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"}`}>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f1b56b] ring-2 ring-[#f1b56b]/20">
                  <span className="text-[#2a2d43] text-xs font-bold">
                    {(user?.name || "A")
                      .split(" ")
                      .map((v) => v[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                </div>
                {!isCollapsed && (
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <p className="truncate text-sm font-semibold text-white">
                      {user?.name || "Alex Morgan"}
                    </p>
                    <p className="truncate text-xs text-[#64748b]">
                      {user?.role === "owner" ? "Owner" : "Member"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={logout}
              title={isCollapsed ? "Logout" : ""}
              className={`flex w-full items-center rounded-xl text-[#cbd5e1] transition hover:bg-[#1a1d36] hover:text-white ${
                isCollapsed ? "justify-center py-3" : "gap-3 px-4 py-3"
              }`}
            >
              <FiLogOut className="h-5 w-5" />
              {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
