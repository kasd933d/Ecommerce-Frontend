import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

// Cookie ka naam
const COOKIE_NAME = "aura_user_session";

export const AuthProvider = ({ children }) => {
  // Initial state: Cookie se data read karein agar exist karta hai
  const [user, setUser] = useState(() => {
    const savedUser = Cookies.get(COOKIE_NAME);
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error parsing user cookie:", error);
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  // Sync state with Cookie whenever user state changes
  useEffect(() => {
    if (user) {
      // 7 din ke expiry period ke saath cookie set karein
      Cookies.set(COOKIE_NAME, JSON.stringify(user), {
        expires: 7, // 7 Days expiry
        secure: true, // HTTPS support
        sameSite: "strict", // Security against CSRF
      });
    } else {
      Cookies.remove(COOKIE_NAME);
    }
  }, [user]);

  // Jab login form submit hoga (userData me 'role' bhi pass karein)
  const loginUser = (userData) => {
    setUser(userData);
  };

  // Profile details update karne ke liye
  const updateUserProfile = (updatedName) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, name: updatedName };
      return updated;
    });
  };

  // Logout handler (Cookie clear karega)
  const logoutUser = () => {
    setUser(null);
    Cookies.remove(COOKIE_NAME);
  };

  // Direct Admin Check
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        loginUser,
        updateUserProfile,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);