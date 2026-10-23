import { useMemo, useState } from "react";
import { TabsComponent } from "./TabsComponent";
import { TaskInputComponent } from "./TaskInputComponent";
import { TodoTask } from "./TodoTask";
import styles from "./List.module.css";

export type LocalTask = {
  id: string;
  title: string;
  completed: boolean;
};

type FilterMode = "all" | "completed" | "incomplete";

const INITIAL_TASKS: LocalTask[] = [
  { id: "1", title: "Criar layout inicial", completed: true },
  { id: "2", title: "Implementar filtro de tarefas", completed: false },
  { id: "3", title: "Adicionar formulário de nova tarefa", completed: false },
];

export function List() {
  const [tasks, setTasks] = useState<LocalTask[]>(INITIAL_TASKS);
  const [filter, setFilter] = useState<FilterMode>("all");

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
                <p className={styles.mainTitle}>LISTA DE TAREFAS CLOUD NETLIFY</p>
                <TabsComponent filter={filter} onChangeFilter={setFilter} />
                <div className={styles.tasksContainer} >
                    {filteredTasks.map((task)=>(
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
