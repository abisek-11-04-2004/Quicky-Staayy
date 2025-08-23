import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { useLocalStorage } from "usehooks-ts";
import AllRooms from "./pages/AllRooms";
import RoomDetails from "./pages/RoomDetails";
import MyBookings from "./pages/MyBookings";
import HotelReg from "./components/HotelReg";
import Layout from "./pages/hotelOwner/Layout";
import Dashboard from "./pages/hotelOwner/Dashboard";
import AddRoom from "./pages/hotelOwner/AddRoom";
import ListRoom from "./pages/hotelOwner/ListRoom";
import Experience from "./pages/Experience";
import About from "./pages/About";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
import ErrorBoundary from "./components/ErrorBoundary";
import JotformChatbot from "./components/JotformChatbot";
import Loader from "./components/Loader";

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");

  // for theme
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const { showHotelReg } = useAppContext();

  return (
    <div data-theme={theme}>
      <Toaster />
      {!isOwnerPath && <Navbar theme={theme} switchTheme={switchTheme} />}
      {showHotelReg && <HotelReg />}
      <div className="min-h-[70vh]">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home theme={theme} />} />
            <Route path="/rooms" element={<AllRooms />} />
            <Route path="/experience" element={<Experience theme={theme} />} />
            <Route path="/about" element={<About />} />
            <Route path="/rooms/:id" element={<RoomDetails />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/loader/:nextUrl" element={<Loader />} />

            
            <Route path="/owner" element={<Layout switchTheme={switchTheme} />}>
              <Route index element={<Dashboard />} />
              <Route path="add-room" element={<AddRoom />} />
              <Route path="list-room" element={<ListRoom />} />

            </Route>
          </Routes>
        </ErrorBoundary>
      </div>
      {!isOwnerPath && <JotformChatbot />}
    </div>
  );
};

export default App;
