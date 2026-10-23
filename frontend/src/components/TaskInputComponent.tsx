import { FormEvent, useState } from "react";
import styles from "./TaskInputComponent.module.css";

type TaskInputComponentProps = {
  onAddTask: (title: string) => void;
};

export function TaskInputComponent({ onAddTask }: TaskInputComponentProps) {
  const [taskTitle, setTaskTitle] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTitle = taskTitle.trim();
    if (!normalizedTitle) {
      return;
    }

    onAddTask(normalizedTitle);
    setTaskTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.taskInputContainer}>
        <button type="submit" className={styles.taskInputButton}>
          +
        </button>

        <input
          value={taskTitle}
          onChange={(event) => setTaskTitle(event.target.value)}
          placeholder="Adicionar tarefa..."
          className={styles.taskInput}
        />
      </div>
    </form>
  );
}