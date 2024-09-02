import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { AuthProvider, useAuth } from "../AuthContext";
import Dashboard from "./pages/Dashboard/Dashboard";
import TopNavbar from "./components/Navbar";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <TopNavbar />
        <Routes>
          {/* Public Routes */}
          <Route
            path="/sign-in"
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />
          <Route
            path="/sign-up"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />

          {/* Private Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Redirect unknown routes */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
}

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return null;
    // return <LoadingPage />;
  }

  if (!isAuthenticated) {
    console.log("Redirecting to sign-in due to lack of authentication");
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // return <LoadingPage />;
    return null;
  }

  if (isAuthenticated) {
    console.log("Redirecting to dashboard due to existing authentication");
    return <Navigate to="/dashboard" state={{ from: location }} />;
  }

  return children;
}

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
