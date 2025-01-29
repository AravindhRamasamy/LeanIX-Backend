import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Todo } from '../entities/todo';
import { AppDataSource } from '../config/database';

@Resolver(Todo)
export class TodoResolver {
  @Query(() => [Todo])
  async todos(): Promise<Todo[]> {
    return await AppDataSource.getRepository(Todo).find();
  }

  @Mutation(() => Todo)
  async createTodo(
    @Arg('title') title: string,
    @Arg('description', { nullable: true }) description?: string,
    @Arg('status', { nullable: true }) status?: 'pending' | 'completed'
  ): Promise<Todo> {
    const todo = AppDataSource.getRepository(Todo).create({ title, description, status });
    return await AppDataSource.getRepository(Todo).save(todo);
  }

  @Mutation(() => Todo)
  async updateTodo(
    @Arg('id') id: string,
    @Arg('title', { nullable: true }) title?: string,
    @Arg('description', { nullable: true }) description?: string,
    @Arg('status', { nullable: true }) status?: 'pending' | 'completed'
  ): Promise<Todo> {
    const todo = await AppDataSource.getRepository(Todo).findOneBy({ id });
    if (!todo) throw new Error('Todo not found');
    if (title) todo.title = title;
    if (description) todo.description = description;
    if (status) todo.status = status;
    return await AppDataSource.getRepository(Todo).save(todo);
  }

  @Mutation(() => Boolean)
  async deleteTodo(
    @Arg('id') id: string
  ): Promise<boolean> {
    const result = await AppDataSource.getRepository(Todo).delete(id);
    return result.affected === 1;
  }
}
