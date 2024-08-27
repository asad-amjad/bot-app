import SignIn from "./Sign-In";
import Dashboard from "./Dashboard";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import TopNavbar from "./components/navbar/TopNavbar";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <TopNavbar />
        <Routes>
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"/"} element={<SignIn />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
