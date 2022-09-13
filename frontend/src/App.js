import React, { useState, useEffect } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import PrivateRoute from "./routes/PrivateRoute";
import PageNotFound from "./routes/PageNotFound";
import ResetPassword from "./components/Dashboard/DashboardSubComponents/ResetPassword";
import jwtDecode from "jwt-decode";
import ErrorBoundary from "./errorBoundary";
import { useSelector } from "react-redux";

const App = () => {
  // The back-to-top button is hidden at the beginning
  const [showButton, setShowButton] = useState(false);

  const data = useSelector((state) => state?.auth?.login?.data?.data || null);
  const loginSuccess = useSelector(
    (state) => state?.auth?.login?.success?.status || false
  );

  const decodedToken = loginSuccess && jwtDecode(data?.token);

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
      <ErrorBoundary>
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
                  <Dashboard user={decodedToken} />
                </PrivateRoute>
              }
            />
            <Route
              path="/user-dashboard/:username"
              element={
                <PrivateRoute>
                  <Dashboard user={decodedToken} />
                </PrivateRoute>
              }
            />
            <Route
              path="/manager-dashboard/:username"
              element={
                <PrivateRoute>
                  <Dashboard user={decodedToken} />
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
      </ErrorBoundary>
    </>
  );
};

export default App;
