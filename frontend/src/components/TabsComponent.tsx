import styles from "./TabsComponent.module.css";

type FilterMode = "all" | "completed" | "incomplete";

type TabsComponentProps = {
  filter: FilterMode;
  onChangeFilter: (nextFilter: FilterMode) => void;
};

export function TabsComponent({
  filter,
  onChangeFilter,
}: TabsComponentProps) {
  return (
    <div className={styles.tabs}>
      <button
        type="button"
        className={`${styles.tabButton} ${filter === "all" ? styles.activeAll : ""}`}
        onClick={() => onChangeFilter("all")}
      >
        Todos
      </button>

      <button
        type="button"
        className={`${styles.tabButton} ${filter === "completed" ? styles.activeCompleted : ""}`}
        onClick={() => onChangeFilter("completed")}
      >
        Completos
      </button>

      <button
        type="button"
        className={`${styles.tabButton} ${filter === "incomplete" ? styles.activeIncomplete : ""}`}
        onClick={() => onChangeFilter("incomplete")}
      >
        Incompletos
      </button>
    </div>
  );
}