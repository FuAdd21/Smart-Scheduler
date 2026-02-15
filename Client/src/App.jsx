import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateSchedule from "./pages/CreateSchedule";
import MyBookings from "./pages/MyBookings";
import OwnerCalendar from "./pages/OwnerCalendar";
import AvailableSchedules from "./pages/AvailableSchedules";
import Clients from "./pages/Clients";
import Settings from "./pages/Settings";
import Messages from "./pages/Messages";
import Home from "./pages/Home";
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

function App() {
  return (
    <Routes>
      {/* Public Routes with Top Navbar */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* /schedules is publicly accessible for booking */}
        <Route path="/schedules" element={<AvailableSchedules />} />
      </Route>

      {/* Private Routes with Sidebar */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/create-schedule" element={
            <ProtectedRoute>
              <CreateSchedule />
            </ProtectedRoute>
          }
        />
        <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route path="/messages" element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />
        <Route path="/my-bookings" element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />
        <Route path="/clients" element={
            <ProtectedRoute>
              <Clients />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/owner/calendar" 
          element={
            <ProtectedRoute user={currentUser} role="owner">
              <OwnerCalendar />
            </ProtectedRoute>
          } 
        />
      </Route>

    </Routes>
  );
}

export default App;
