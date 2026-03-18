import { TasksService } from './tasks.service';
import { Task } from './task.schema';
import { describe, expect, it, jest } from '@jest/globals';

describe('TasksService', () => {
  describe('getAllTasks', () => {
    it('deve retornar todas as tarefas usando find().lean().exec()', async () => {
      const tasksMock: Task[] = [
        { title: 'Tarefa 1', completed: false },
        { title: 'Tarefa 2', completed: true },
      ];

      const exec = jest.fn<() => Promise<Task[]>>().mockResolvedValue(tasksMock);
      const lean = jest.fn().mockReturnValue({ exec });
      const find = jest.fn().mockReturnValue({ lean });

      const tasksModelMock = { find } as any;
      const service = new TasksService(tasksModelMock);

      const result = await service.getAllTasks();

      expect(find).toHaveBeenCalledWith({});
      expect(lean).toHaveBeenCalledTimes(1);
      expect(exec).toHaveBeenCalledTimes(1);
      expect(result).toEqual(tasksMock);
    });
  });
});
