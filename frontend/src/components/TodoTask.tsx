import { useState } from "react";
import { LocalTask } from "./List";
import styles from "./TodoTask.module.css";

type TodoTaskProps = {
  task: LocalTask;
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string, nextTitle: string) => void;
};

export function TodoTask({ task, onToggle, onDelete, onEdit }: TodoTaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(task.title);

  const handleToggleEdit = () => {
    if (isEditing) {
      const normalized = draftTitle.trim();
      if (normalized) {
        onEdit(task.id, normalized);
      } else {
        setDraftTitle(task.title);
      }
    }

    setIsEditing((prev) => !prev);
  };

  const taskContainerClass = `${styles.taskContainer} ${
    task.completed ? styles.completed : styles.incomplete
  }`;

  return (
    <div className={taskContainerClass}>
      <button type="button" className={styles.iconButton} onClick={() => onToggle(task.id)}>
        {task.completed ? "☑" : "☐"}
      </button>

      <span className={styles.taskWrap}>
        {isEditing ? (
          <input
            value={draftTitle}
            onChange={(event) => setDraftTitle(event.target.value)}
            className={styles.taskInput}
          />
        ) : (
          <p className={styles.task}>{task.title}</p>
        )}
      </span>

      <button
        type="button"
        className={styles.iconButton}
        onClick={() => (isEditing ? setDraftTitle(task.title) : onDelete(task.id))}
      >
        {isEditing ? "✕" : "🗑"}
      </button>

      <button type="button" className={styles.iconButton} onClick={handleToggleEdit}>
        {isEditing ? "💾" : "✎"}
      </button>
    </div>
  );
}