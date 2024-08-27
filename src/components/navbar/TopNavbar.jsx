import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import reactLogo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import ThemeMode from "../theme-mode/ThemeMode";
import "./styles.css"

const TopNavbar = () => {
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
        <div className="d-flex align-items-center gap-2">
          <Navbar.Brand href="/dashboard">Logout</Navbar.Brand>
          <ThemeMode />
        </div>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
