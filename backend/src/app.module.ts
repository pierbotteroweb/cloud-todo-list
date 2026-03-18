import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoModule } from './database/mongo/mongo.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [MongoModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
