import React, { useState, useEffect } from "react";
import "./Projects.css";

const Projects = ({ tasks }) => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const fetchProjects = async () => {
    try {
      const res = await fetch("http://localhost:5000/projects");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Error al cargar proyectos:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const addProject = async (e) => {
    e.preventDefault();
    if (!newProject.trim()) return;

    const project = { name: newProject.trim() };
    try {
      const res = await fetch("http://localhost:5000/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });
      const data = await res.json();
      setProjects([...projects, data]);
      setNewProject("");
    } catch (error) {
      console.error("Error al añadir proyecto:", error);
    }
  };

  const updateProject = async (projectId, updatedName) => {
    try {
      const res = await fetch(`http://localhost:5000/projects/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: updatedName }),
      });
      const data = await res.json();
      setProjects(projects.map((p) => (p.id === projectId ? data : p)));
      setEditId(null);
      setEditText("");
    } catch (error) {
      console.error("Error al actualizar proyecto:", error);
    }
  };

  const deleteProject = async (projectId) => {
    try {
      await fetch(`http://localhost:5000/projects/${projectId}`, { method: "DELETE" });
      setProjects(projects.filter((p) => p.id !== projectId));
    } catch (error) {
      console.error("Error al eliminar proyecto:", error);
    }
  };

  const getProgress = (projectId) => {
    if (!tasks) return 0;
    const projectTasks = tasks.filter((t) => t.projectId === projectId);
    if (!projectTasks.length) return 0;
    const completed = projectTasks.filter((t) => t.completed).length;
    return Math.round((completed / projectTasks.length) * 100);
  };

  return (
    <div className="projects-container">
      <h2>📂 Proyectos</h2>

      <form className="project-form" onSubmit={addProject}>
        <input
          type="text"
          placeholder="Nuevo proyecto..."
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>

      <ul className="project-list">
        {projects.map((project) => (
          <li key={project.id} className="project-item">
            {editId === project.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => updateProject(project.id, editText)}>Guardar</button>
                <button onClick={() => setEditId(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <div className="project-header">
                  <span>{project.name}</span>
                  <div className="project-actions">
                    <button onClick={() => { setEditId(project.id); setEditText(project.name); }}>Editar</button>
                    <button onClick={() => deleteProject(project.id)}>Eliminar</button>
                  </div>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${getProgress(project.id)}%` }}
                  ></div>
                </div>
                <span className="progress-text">{getProgress(project.id)}% completado</span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
