import { useEffect, useState } from "react";
import { mondogbService, Task } from "@/services/mondogb";

export function TodoTask() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await mondogbService.getAllTasks();
        setTasks(data);
      } catch {
        setError("Não foi possível carregar as tarefas.");
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  if (loading) return <span>Carregando tarefas...</span>;
  if (error) return <span>{error}</span>;
  if (!tasks.length) return <span>Nenhuma tarefa encontrada.</span>;

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>{task.title}</li>
      ))}
    </ul>
  );
}