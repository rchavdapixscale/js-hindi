import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Posts } from "./customer/Posts";
import NavBar from "./Navbar/Navbar";
import Postss from "./Role/Postss";
import Login from "./LoginPage/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import OtpGenerator from ".//LoginOtp/LoginOtp";


const AppRoutes = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  if (isLoginPage) {
    // Render login page without shared layout
    return (
      <div className="container-me">
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    );
  }

  // Render rest of the app with layout
  return (
    <div className="app-container">
      <NavBar />
      <section className="main-section">
        <Routes>
          <Route
            path="/otp"
            element={
              <ProtectedRoute>
                <OtpGenerator />
              </ProtectedRoute>
            }
          />
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

  if (document.getElementById("spinner")) {
    setTimeout(() => {
      document.getElementById("spinner").style.display = "none";
      setLoading(false);
    }, 2000);
  }

  return (
    !loading && (
      <Router>
        <AppRoutes />
      </Router>
    )
  );
};

export default App;
