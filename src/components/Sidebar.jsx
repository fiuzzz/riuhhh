import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import {
  FaHome,
  FaBox,
  FaSignOutAlt,
  FaTruckLoading,
  FaTruckMoving,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <h5>PeTIK</h5>
      <ul>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaHome className="icon" /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/data_pendaftar"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaBox className="icon" /> Data Pendaftar
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/form_registrasi"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaTruckLoading className="icon" /> Form Registrasi
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
