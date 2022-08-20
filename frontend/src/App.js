import React, { useState, useEffect } from "react";
import "./App.css";
import Dashboard from "./componets/Dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./componets/Login/Login";
import PrivateRoute from "./routes/PrivateRoute";
import PageNotFound from "./routes/PageNotFound";
import ResetPassword from "./componets/Dashboard/DashboardSubComponents/ResetPassword";

const App = () => {
  // The back-to-top button is hidden at the beginning
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  // This function will scroll the window to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smoothly scrolling
    });
  };
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<Login />} />
          <Route
            path="/passwordreset/:resetToken"
            element={<ResetPassword />}
          />
          <Route
            path="/subject-officer-dashboard/:username"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-dashboard/:username"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/manager-dashboard/:username"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
      <>
        {/* React Fragment */}
        {showButton && (
          <button onClick={scrollToTop} className="back-to-top">
            <i className="fa fa-arrow-circle-up" aria-hidden="true"></i>
          </button>
        )}
        {/* &#8679; is used to create the upward arrow */}
      </>
    </>
  );
};

export default App;
