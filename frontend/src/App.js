import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Reset from "./pages/reset";
import ProtectedRoute from "./Protected_Route";
import "./styles/global.css"; 

function App() {
  return (
    <Router>
      {/* Routes component contains all the route definitions */}
      <Routes>

        {/* Redirect root URL "/" to "/login" page */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public routes: accessible without logging in */}
        <Route path="/login" element={<Login />} />
        {/*<Route path="/signup" element={<Signup />} />*/}
        <Route path="/reset" element={<Reset />} />

        {/* Protected routes: accessible only if logged in */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />


        {/* Fallback route: shows 404 message for any unknown URL */}
        <Route path="*" element={<h2>404 Not Found</h2>} />

      </Routes>
    </Router>
  );
}

export default App;

