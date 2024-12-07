import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Reg } from "./pages/Reg";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import RequireAuth from "./components/RequireAuth";
import { Dashboard } from "./pages/Dashboard";
import { PatientProfile } from "./pages/patientprofile/PatientProfile";
import { Prescadd } from "./components/Prescadd";
import { SidebarLayout } from "./layouts/SidebarLayout";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/Reg" element={<Reg />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Prescadd" element={<Prescadd />} />

          {/* Private Routes */}
          <Route element={<RequireAuth />}>
            <Route element={<SidebarLayout />}>
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/PatientProfile" element={<PatientProfile />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
