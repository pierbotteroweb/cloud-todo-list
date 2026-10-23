import { useEffect, useMemo, useState } from "react";
import { TabsComponent } from "./TabsComponent";
import { TaskInputComponent } from "./TaskInputComponent";
import { TodoTask } from "./TodoTask";
import styles from "./List.module.css";
import { mondogbService } from "@/services/mondogb";

export type LocalTask = {
  id: string;
  title: string;
  completed: boolean;
};

type FilterMode = "all" | "completed" | "incomplete";

export function List() {
  const [tasks, setTasks] = useState<LocalTask[]>([]);
  const [filter, setFilter] = useState<FilterMode>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasksFromApi = await mondogbService.getAllTasks();
        setTasks(
          tasksFromApi.map(({ _id, title, completed }) => ({
            id: _id,
            title,
            completed,
          })),
        );
      } catch {
        setError("Não foi possível carregar as tarefas. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    if (filter === "completed") {
      return tasks.filter((task) => task.completed);
    }

    if (filter === "incomplete") {
      return tasks.filter((task) => !task.completed);
    }

    return tasks;
  }, [tasks, filter]);

  const addTask = (title: string) => {
    const newTask: LocalTask = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const editTask = (taskId: string, nextTitle: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, title: nextTitle } : task,
      ),
    );
  };

    const listElement = (
        <div className={styles.container}>
            <div className={styles.mainWrap}>
                <p className={styles.mainTitle}>LISTA DE TAREFAS CLOUD!!!</p>
                <TabsComponent filter={filter} onChangeFilter={setFilter} />
                <div className={styles.tasksContainer}>
                    {isLoading && <p className={styles.statusMessage}>Carregando tarefas...</p>}
                    {error && <p className={styles.errorMessage}>{error}</p>}
                    {!isLoading && !error && filteredTasks.length === 0 && (
                      <p className={styles.statusMessage}>Nenhuma tarefa encontrada.</p>
                    )}
                    {!isLoading && !error && filteredTasks.map((task) => (
                      <div key={task.id} className={styles.taskWrapper}>
                        <TodoTask
                          task={task}
                          onToggle={toggleTask}
                          onDelete={deleteTask}
                          onEdit={editTask}
                        />
                      </div>
                    ))}
                </div>
                <TaskInputComponent onAddTask={addTask} />
            </div>
        </div>
    )

  return listElement;
}
