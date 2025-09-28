import React, { useState, useEffect } from "react";
import "./Tasks.css";

const Tasks = ({ projects }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [newTask, setNewTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error al cargar tareas:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim() || !selectedProject) return;

    const task = {
      text: newTask.trim(),
      completed: false,
      projectId: selectedProject,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      const data = await res.json();
      setTasks([...tasks, data]);
      setNewTask("");
    } catch (error) {
      console.error("Error al añadir tarea:", error);
    }
  };

  const updateTask = async (taskId, updatedText) => {
    try {
      const res = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: updatedText }),
      });
      const data = await res.json();
      setTasks(tasks.map((t) => (t.id === taskId ? data : t)));
      setEditId(null);
      setEditText("");
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  const deleteTask = async (taskId) => {
    if (!window.confirm("¿Seguro que quieres eliminar esta tarea?")) return;

    try {
      await fetch(`http://localhost:5000/tasks/${taskId}`, { method: "DELETE" });
      setTasks(tasks.filter((t) => t.id !== taskId));
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  const toggleComplete = async (task) => {
    try {
      const res = await fetch(`http://localhost:5000/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });
      const data = await res.json();
      setTasks(tasks.map((t) => (t.id === task.id ? data : t)));
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    }
  };

  const filteredTasks = selectedProject
    ? tasks.filter((t) => t.projectId === selectedProject)
    : [];

  return (
    <div className="tasks-container">
      <h2>📝 Tareas</h2>

      <select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
        <option value="">Selecciona un proyecto</option>
        {projects.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      {selectedProject && (
        <>
          <form className="task-form" onSubmit={addTask}>
            <input
              type="text"
              placeholder="Nueva tarea..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button type="submit">Agregar</button>
          </form>

          <ul className="task-list">
            {filteredTasks.map((task) => (
              <li key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
                {editId === task.id ? (
                  <>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button onClick={() => updateTask(task.id, editText)}>Guardar</button>
                    <button onClick={() => setEditId(null)}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <span>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleComplete(task)}
                      />{" "}
                      {task.text}
                    </span>
                    <div className="task-actions">
                      <button onClick={() => { setEditId(task.id); setEditText(task.text); }}>
                        Editar
                      </button>
                      <button onClick={() => deleteTask(task.id)}>Eliminar</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Tasks;
