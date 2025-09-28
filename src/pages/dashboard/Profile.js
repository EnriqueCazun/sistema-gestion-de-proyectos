import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Profile.css";

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    if (user) {
      setForm({ name: user.name, email: user.email, password: "" });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.email === user.email
        ? { ...u, name: form.name, password: form.password || u.password }
        : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("auth_user", JSON.stringify({ ...user, name: form.name }));

    alert("Perfil actualizado. Vuelve a iniciar sesión para aplicar cambios.");
    logout();
  };

  return (
    <div className="profile-container card">
      <h2>👤 Perfil del Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="profile-field">
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="profile-field">
          <label>Email (no editable):</label>
          <input type="email" value={form.email} disabled />
        </div>

        <div className="profile-field">
          <label>Nueva Contraseña:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Dejar vacío para no cambiar"
          />
        </div>

        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default Profile;
