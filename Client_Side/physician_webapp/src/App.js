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
import { Batches } from "./pages/BatchesPage/Batches";
import { MyProfile } from "./pages/DocProfile/MyProfile";
import PersistLogin from "./components/PersistLogin";
import RequirePatient from "./components/RequirePatient";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/Reg" element={<Reg />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Prescadd" element={<Prescadd />} />

        {/* Private Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route element={<SidebarLayout />}>
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Batches" element={<Batches />} />
              <Route path="/MyProfile" element={<MyProfile />} />
              <Route element={<RequirePatient />}>
                <Route path="/PatientProfile" element={<PatientProfile />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
