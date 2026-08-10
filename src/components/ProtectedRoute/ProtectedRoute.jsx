import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";


// Agar logged in hai, toh Login/Signup page par na jane de (Home phek de)
export const PublicOnlyRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace /> : children;
};

// Agar logged in nahi hai, toh Profile page par na jane de (Login phek de)
export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};