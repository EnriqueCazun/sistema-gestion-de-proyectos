import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Register.css";

function Register() {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [confirm, setConfirm] = useState(""); 
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }
    const res = register({ name: name.trim(), email: email.trim(), password });
    if (!res.success) {
      setError(res.message);
      return;
    }
    navigate("/dashboard");
  };

  return (
    <div className="auth-container">
      <div className="card">
        <h2>Registro</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Nombre</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Tu nombre" 
              required
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="tu@correo.com" 
              required
            />
          </div>
          <div className="field">
            <label>Contraseña</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="********" 
              required
            />
          </div>
          <div className="field">
            <label>Confirmar contraseña</label>
            <input 
              type="password" 
              value={confirm} 
              onChange={(e) => setConfirm(e.target.value)} 
              placeholder="********" 
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Registrarse</button>
        </form>
        <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
      </div>
    </div>
  );
}

export default Register;
