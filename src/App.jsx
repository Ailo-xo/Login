import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ProtectedRoute, GuestRoute } from "./components/RouteGuards";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import "./App.css";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </main>
    </>
  );
}
