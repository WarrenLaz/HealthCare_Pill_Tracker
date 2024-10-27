import './App.css';
import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Supp } from "./components/Supp"

function App() {
  return (
    <>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Supp" element={<Supp />} />
        </Routes>
      </div>
    </Router>
</>
  );
}

export default App;
