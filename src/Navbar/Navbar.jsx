import { Link } from "react-router-dom";
import { useState } from "react";
import profilePic from "../assets/Group 1000005996@2x.png";
import "../APP.CSS";

const Navbar = () => {
  const [openReport, setOpenReport] = useState(false);


  return (
    <>
      <div style={{ height: "100px", width: "240px", position: "absolute", zIndex: "2", left: "0" }}>
        <img
          src={profilePic}
          alt="Profile"
          style={{ height: "60px", width: "225px", paddingTop: "25px", paddingLeft: "8px" }}
        />
      </div>

      <aside
        style={{
          width: "200px",
          background: "#405189",
          color: "#fff",
          height: "100vh",
          padding: "20px",
          position: "fixed",
          top: "0",
          left: "0",
        }}
      >
        <ul style={{ paddingLeft: "20px", paddingTop: "80px", listStyleType: "none", marginTop: "20px" }}>
          <li style={{ padding: "10px" }}>
            <Link to="" style={linkStyle}>Dashboard</Link>
          </li>
          <li style={{ padding: "10px", cursor: "pointer" }} onClick={() => setOpenReport(!openReport)}>
            <span style={linkStyle}>Master ▾</span>
            {openReport && (
              <ul style={dropdownStyle}>
                <li><Link to="/customer" style={sublinkStyle}>Customer</Link></li>
                <li><Link to="/Postss" style={sublinkStyle}>Role</Link></li>
              </ul>
            )}
          </li>
          <li style={{ padding: "10px" }}>
            <Link to="/" style={linkStyle}>Inventory</Link>
          </li>
          <li style={{ padding: "10px" }}>
            <Link to="/logout" style={linkStyle}>Order</Link>
          </li>
          <li style={{ padding: "10px" }}>
            <Link to="/logout" style={linkStyle}>Report</Link>
          </li>
          <li style={{ padding: "10px" }}>
            <Link to="/logout" style={linkStyle}>Log Out</Link>
          </li>
          <li style={{ padding: "10px" }}>
            <Link to="/logout" style={linkStyle}>Report</Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

const linkStyle = {
  fontSize: "25px",
  textDecoration: "none",
  letterSpacing: "1px",
  color: "white",
};

const dropdownStyle = {
  listStyleType: "none",
  marginTop: "10px",
  paddingLeft: "15px",
};

const sublinkStyle = {
  fontSize: "16px",
  textDecoration: "none",
  color: "#fff",
  display: "block",
  padding: "5px 0",
};

export default Navbar;
