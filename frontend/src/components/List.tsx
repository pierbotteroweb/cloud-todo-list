import { useEffect, useState } from "react";
import { TabsComponent } from "./TabsComponent";
import { TaskInputComponent } from "./TaskInputComponent";
import { TodoTask } from "./TodoTask";
import { mondogbService, Task } from "@/services/mondogb";

export function List() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(()=>{
    async function loadTasks(){
        try{
            const data = await mondogbService.getAllTasks();
            setTasks(data)
        } catch {
            setError("Náo foi possível carregar as tarefas.")
        } finally {
            setLoading(false)
        }
    }
    loadTasks()
  },[])

    const listElement = (
        <div className="container">
            <div className="mainWrap">
                <p className="mainTitle">LISTA DE TAREFAS CLOUD</p>
                <TabsComponent />
                <div className="tasks-container">
                    {tasks.map((task)=>(
                        <div key={task._id} className="task-wrapper">
                            <TodoTask task={task}/>
                        </div>
                    ))}
                </div>
                <TaskInputComponent />
            </div>
        </div>
    )

  return listElement;
}
