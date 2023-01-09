import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Admin from "./pages/Admin";
import Add from "./pages/Add";
import Update from "./pages/Update";
import NavbarAdmin from "./pages/NavbarAdmin";
import Navbar from "./pages/Navbar";

import Home from "./pages/Home";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        
        <Routes>
          <Route path="/" element={<><Navbar/><Home /></>} />
          <Route path="/admin" element={<><NavbarAdmin /><Admin /></>} />
          <Route path="/add" element={<><NavbarAdmin /><Add /></>} />
          <Route path="/update/:id" element={<><NavbarAdmin /><Update /></>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
