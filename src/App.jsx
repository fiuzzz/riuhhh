import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import FormRegristrasi from "./pages/FormRegristrasi";
import DataPendaftar from "./pages/DataPendaftar";
import EditPendaftar from "./pages/EditPendaftar";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/form_registrasi" element={<FormRegristrasi />} />
          <Route path="/data_pendaftar" element={<DataPendaftar />} />
          <Route path="/edit_data/:id" element={<EditPendaftar />} />
          <Route path="/landingpage" element={<LandingPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
