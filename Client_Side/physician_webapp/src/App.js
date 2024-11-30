import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Reg } from "./pages/Reg";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import RequireAuth from "./components/RequireAuth";
import { Dashboard } from "./pages/Dashboard";
import { Prescadd } from "./components/Prescadd";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            {/* public Routes*/}
            <Route path="/" element={<Home />} />
            <Route path="/Reg" element={<Reg />} />
            <Route path="/Login" element={<Login />} />
            {/* Test component */}
            <Route path="/Prescadd" element={<Prescadd/>}/>
            {/* private Routes*/}
            <Route element={<RequireAuth/>}>
            <Route path="/Dashboard" element={<Dashboard/>} />
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
