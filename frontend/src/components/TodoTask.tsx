import { Task } from "@/services/mondogb";

type TodoTaskProps = {
  task: Task;
};

export function TodoTask({ task }: TodoTaskProps) {

  return (
    <p className='task'>{task.title}</p>
  );
}