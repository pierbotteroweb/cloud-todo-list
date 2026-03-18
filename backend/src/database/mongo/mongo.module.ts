import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://pierbotteroweb_db_user:UDZ9Bldaao2HP8a8@cluster-todo.v7lkott.mongodb.net/?appName=cluster-todo',
      { autoIndex: true },
    ),
  ],
})
export class MongoModule {  

  constructor(
    @InjectConnection() private readonly connection: Connection,
  ) {}

  onModuleInit() {
    if (this.connection.readyState === 1) {
      console.log('🟢 Connected to Could Todo List Database');
    }

    this.connection.on('error', (err) => {
      console.error('🔴 Error connecting to MongoDB', err);
    });
  }


}
