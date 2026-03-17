import { TabsComponent } from "./TabsComponent";
import { TaskInputComponent } from "./TaskInputComponent";
import { TodoTask } from "./TodoTask";

export function List() {

    const listElement = (
        <div className="container">
            <div className="mainWrap">
                <p className="mainTitle">LISTA DE TAREFAS CLOUD</p>
                <TabsComponent />
                <div className="tasks-container">
                    <div className="task-wrapper">
                        <TodoTask />
                    </div>
                </div>
                <TaskInputComponent />
            </div>
        </div>
    )

  return listElement;
}
