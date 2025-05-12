import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      localStorage.setItem("auth", "true");
      navigate("/customer");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <form className="form_container" onSubmit={handleLogin}>
      <div className="title_container">
        <p className="title">Login</p>
      </div>
      <div className="input_container">
        <label className="input_label" htmlFor="email_field">
          Username
        </label>
        <input
          placeholder="admin"
          type="text"
          className="input_field"
          id="email_field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="input_container">
        <label className="input_label" htmlFor="password_field">
          Password
        </label>
        <input
          placeholder="Password"
          type="password"
          className="input_field"
          id="password_field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="sign-in_btn">
        <span>Sign In</span> 
      </button>
      <span style={{fontSize:"13px", letterSpacing:"1px"}}>Don't have an account? <a href="" style={{color: "rgb(0, 149, 247)", textDecoration:"none", paddingLeft:"10px", fontSize:"15px"}}>Sign Up</a></span>
      <span style={{fontSize:"13px", fontFamily:"sans-serif"}}>Forget password?</span>
    </form>
  );
};

export default Login;
