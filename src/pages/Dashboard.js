import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import Projects from "./dashboard/Projects";
import Tasks from "./dashboard/Tasks";
import Profile from "./dashboard/Profile";
import "./Dashboard.css";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [stats, setStats] = useState({ projects: 0, tasks: 0, completed: 0 });
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const fetchData = async () => {
    try {
      const projectsRes = await fetch("http://localhost:5000/projects");
      const projectsData = await projectsRes.json();
      setProjects(projectsData);

      const tasksRes = await fetch("http://localhost:5000/tasks");
      const tasksData = await tasksRes.json();
      setTasks(tasksData);

      const completed = tasksData.filter(t => t.completed).length;
      setStats({ projects: projectsData.length, tasks: tasksData.length, completed });
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dashboard-root">
      <header className="dashboard-header">
        <h1>Sistema de Proyectos</h1>
        <div className="user-actions">
          <span>{user?.name}</span>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </header>

      <main className="dashboard-main">
        <nav className="dashboard-nav">
          <ul>
            <li><Link to="/dashboard/projects">Proyectos</Link></li>
            <li><Link to="/dashboard/tasks">Tareas</Link></li>
            <li><Link to="/dashboard/profile">Perfil</Link></li>
          </ul>
        </nav>

        <section className="dashboard-body">
          <div className="dashboard-stats">
            <div className="stat-card">
              <h3>Proyectos</h3>
              <p>{stats.projects}</p>
            </div>
            <div className="stat-card">
              <h3>Tareas</h3>
              <p>{stats.tasks}</p>
            </div>
            <div className="stat-card">
              <h3>Completadas</h3>
              <p>{stats.completed}</p>
            </div>
          </div>

          <Routes>
            <Route path="projects" element={<Projects tasks={tasks} />} />
            <Route path="tasks" element={<Tasks projects={projects} />} />
            <Route path="profile" element={<Profile />} />
            <Route path="" element={<p>Selecciona una opción del menú</p>} />
          </Routes>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
