import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import reactLogo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import ThemeMode from "../ThemeMode/ThemeMode";
import { useAuth } from "../../../AuthContext"; // Import useAuth
import { FiLogOut } from "react-icons/fi";
import Tooltip from "../Tooltip/Tooltip";
import "./Navbar.css";

const TopNavbar = () => {
  const { setIsAuthenticated, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/sign-in");
  };

  return (
    <Navbar expand="lg" className="pt-2 custom-navbar">
      <Container className="d-flex justify-content-between align-items-center">
        <Link to="/dashboard">
          <img
            src={reactLogo}
            className="logo react"
            alt="React logo"
            width={160}
          />
        </Link>
        <div className="d-flex align-items-center gap-4">
          {isAuthenticated && (
            <Tooltip content="Log out" place="bottom">
              <div className="card p-2" role="button" onClick={handleLogout}>
                <FiLogOut />
              </div>
            </Tooltip>
          )}
          <ThemeMode />
        </div>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
