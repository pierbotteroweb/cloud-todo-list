import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './task.schema';
import { TasksService } from './tasks.service';

@Module({
    controllers:[TasksController],
    imports:[
        MongooseModule.forFeature([
        { name: Task.name, schema: TaskSchema },
        ])
    ],
    providers:[TasksService]
})
export class TasksModule {}
