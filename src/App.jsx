import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Posts } from "./customer/Posts";
import NavBar from "./Navbar/Navbar";
import Postss from "./Role/Postss";

const App = () => {
  const [loading, setLoading] = useState(true);
  const spinner = document.getElementById("spinner");
  if (spinner) {
    setTimeout(() => {
      spinner.style.display = "none";
      setLoading(false);
    }, 2000);
  }

  return (
      !loading && (
      <Router>
        <div className="app-container">
          <NavBar />
          <section className="main-section">
            <Routes>
              <Route path="/" element={<Posts />} />
              <Route path="/customer" element={<Posts />} />
              <Route path="/Postss" element={<Postss />} />
            </Routes>
          </section>
        </div>
      </Router>
      )
  );
};

export default App;
