import './App.css';
import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import { DrugSearch } from "./components/DrugSearch";
import { Supp } from "./components/Supp"
import { Reg } from "./components/Reg"
import { Login } from "./components/Login"
function App() {
  return (
    <>
    <Router>
      <div className="App">
        <Routes>
          
          <Route path="/DrugSearch" element={<DrugSearch />} />
          <Route path="/Supp" element={<Supp />} />
          <Route path="/Reg" element={<Reg/>}/>
          <Route path="/Login" element={<Login/>}/>
        </Routes>
      </div>
    </Router>
</>
  );
}

export default App;
