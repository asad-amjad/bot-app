/* eslint-disable react/prop-types */
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";

import TopNavbar from "./components/navbar/TopNavbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";

import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

function App() {
  // Simulate authentication state (replace with actual auth logic)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated (e.g., token check)
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/sign-in" />;
  };

  return (
    <Router>
      <TopNavbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Private Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Redirect unknown routes to the dashboard or sign-in */}
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/sign-in"} />} />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/sign-in"} />} />
      </Routes>
      <ToastContainer /> {/* Toast Container */}
    </Router>
  );
}

export default App;
