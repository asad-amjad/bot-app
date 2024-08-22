import Container from "react-bootstrap/Container";
// import Nav from 'react-bootstrap/Nav';
import Navbar from "react-bootstrap/Navbar";
import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import NavDropdown from 'react-bootstrap/NavDropdown';

const TopNavbar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow">
      <Container>
        <div>
          <a href="https://react.dev" target="_blank">
            <img
              src={reactLogo}
              className="logo react"
              alt="React logo"
              width={40}
            />
          </a>
        </div>
        <Navbar.Brand href="#home">Logout</Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
};
export default TopNavbar;
