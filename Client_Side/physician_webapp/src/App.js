import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DrugSearch } from "./components/DrugSearch";
import { Supp } from "./components/Supp";
import { Reg } from "./components/Reg";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { NewPatient } from "./components/NewPatient";

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
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
