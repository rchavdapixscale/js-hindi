import { Link } from "react-router-dom";
import { useState } from "react";
import profilePic from "../assets/Group 1000005996@2x.png";
import "./Navbar.css"; 

const Navbar = () => {
  const [openReport, setOpenReport] = useState(false);

  return (
    <>
      <div className="navbar-logo-container">
        <img src={profilePic} alt="Profile" className="navbar-logo" />
      </div>

      <aside className="navbar-aside">
        <ul className="navbar-list">
          <li className="navbar-list-item">
            <Link to="/LoginOtp" className="navbar-link">
              Login Otp
            </Link>
          </li>
          <li className="navbar-list-item">
            <Link to="" className="navbar-link">
              Dashboard
            </Link>
          </li>
          <li
            className="navbar-list-item navbar-pointer"
            onClick={() => setOpenReport(!openReport)}
          >
            <span className="navbar-link">Master ▾</span>
            {openReport && (
              <ul className="navbar-dropdown">
                <li>
                  <Link to="/customer" className="navbar-sublink">
                    Customer
                  </Link>
                </li>
                <li>
                  <Link to="/Postss" className="navbar-sublink">
                    Role
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="navbar-list-item">
            <Link to="/" className="navbar-link">
              Inventory
            </Link>
          </li>
          <li className="navbar-list-item">
            <Link to="/logout" className="navbar-link">
              Order
            </Link>
          </li>
          <li className="navbar-list-item">
            <Link to="/logout" className="navbar-link">
              Report
            </Link>
          </li>
          <li className="navbar-list-item">
            <span
              className="navbar-link navbar-pointer"
              onClick={() => {
                localStorage.removeItem("auth");
                window.location.href = "/login";
              }}
            >
              Log Out
            </span>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Navbar;
