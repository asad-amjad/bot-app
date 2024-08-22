import SignIn from "./Sign-In";
import Dashboard from "./Dashboard";
import "./App.css";
import { Route, HashRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <>
      
      <Router>
        <Routes>
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"/"} element={<SignIn />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;