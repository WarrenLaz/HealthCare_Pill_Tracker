import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DrugSearch } from "./components/DrugSearch";
import { Supp } from "./components/Supp";
import { Reg } from "./pages/Reg";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { NewPatient } from "./components/newPatient";
import { PhyDash } from "./components/PhyDash";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/DrugSearch" element={<DrugSearch />} />
            <Route path="/Supp" element={<Supp />} />
            <Route path="/Reg" element={<Reg />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/NewPatient" element={<NewPatient />} />
            <Route path="/PhyDash" element={<PhyDash />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
