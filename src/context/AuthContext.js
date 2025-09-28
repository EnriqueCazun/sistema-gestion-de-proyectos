import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) {
      return { success: false, message: "Credenciales incorrectas" };
    }
    setUser(found);
    return { success: true, user: found };
  };

  const register = ({ name, email, password }) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.find(u => u.email === email);
    if (exists) {
      return { success: false, message: "El email ya está registrado" };
    }
    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};