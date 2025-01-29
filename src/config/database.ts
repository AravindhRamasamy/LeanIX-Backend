import { DataSource } from 'typeorm';
import { Todo } from '../entities/todo';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost', 
    port: 5433, 
    username: 'postgres', 
    password: 'password', 
    database: 'todo_db',
    synchronize: false, 
    logging: true, 
    entities: [Todo], 
  });
  

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully!');
  })
  .catch((error) => console.log('Database connection error:', error));
