import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Posts } from "./customer/Posts";
import NavBar from "./Navbar/Navbar";
import Postss from "./Role/Postss";
import Login from "./LoginPage/LoginPage";
import ProtectedRoute from "./ProtectedRoute";

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="app-container">
      {!isLoginPage && <NavBar />}
      <section className="main-section">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Posts />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/customer"
            element={
              <ProtectedRoute>
                <Posts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Postss"
            element={
              <ProtectedRoute>
                <Postss />
              </ProtectedRoute>
            }
          />
        </Routes>
      </section>
    </div>
  );
};

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
        <AppContent />
      </Router>
    )
  );
};

export default App;
