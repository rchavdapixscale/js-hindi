import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    
      <div style={{ padding: "50px", textAlign: "center", border:"1px solid black", marginLeft:"20px", backgroundColor:"#7ca1f2"}}>
        <h2 style={{fontSize:"30px", color:"white"}}>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <br />
          <button type="submit" style={{background:"white", padding:"8px 25px"}}>Login</button>
        </form>
      </div>

  );
};

export default Login;
