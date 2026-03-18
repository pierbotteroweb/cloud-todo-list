import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private readonly tasksModel: Model<TaskDocument>,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    const tasks = await this.tasksModel.find({}).lean().exec();
    return tasks;
  }
}
