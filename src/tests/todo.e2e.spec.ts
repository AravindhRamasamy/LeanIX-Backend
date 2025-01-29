import { ApolloServer } from 'apollo-server';
import { gql } from 'graphql-tag';
import { buildSchema } from 'type-graphql';
import { TodoResolver } from '../resolvers/todo.resolver';
import { AppDataSource } from '../config/database';

describe('Todo API Tests', () => {
  let server: ApolloServer;

  beforeAll(async () => {
    // Initialize database connection
    await AppDataSource.initialize();

    // Build GraphQL schema
    const schema = await buildSchema({
      resolvers: [TodoResolver],
    });

    // Create Apollo Server with the schema
    server = new ApolloServer({
      schema,
    });
  });

  afterAll(async () => {
    // Close database connection
    await AppDataSource.destroy();
  });

  const CREATE_TODO = gql`
    mutation CreateTodo($title: String!, $description: String, $status: String!) {
      createTodo(title: $title, description: $description, status: $status) {
        id
        title
        description
        status
      }
    }
  `;

  const GET_ALL_TODOS = gql`
    query GetAllTodos {
      todos {
        id
        title
        description
        status
      }
    }
  `;

  const UPDATE_TODO = gql`
    mutation UpdateTodo(
      $id: String!
      $title: String
      $description: String
      $status: String
    ) {
      updateTodo(
        id: $id
        title: $title
        description: $description
        status: $status
      ) {
        id
        title
        description
        status
      }
    }
  `;

  const DELETE_TODO = gql`
    mutation DeleteTodo($id: String!) {
      deleteTodo(id: $id)
    }
  `;

  it('should create a new todo', async () => {
    const response = await server.executeOperation({
      query: CREATE_TODO,
      variables: {
        title: 'Test Todo',
        description: 'This is a test description',
        status: 'pending',
      },
    });

    expect(response.errors).toBeUndefined();
    expect(response.data?.createTodo.title).toBe('Test Todo');
    expect(response.data?.createTodo.description).toBe('This is a test description');
    expect(response.data?.createTodo.status).toBe('pending');
  });

  it('should fetch all todos', async () => {
    const response = await server.executeOperation({
      query: GET_ALL_TODOS,
    });

    expect(response.errors).toBeUndefined();
    expect(Array.isArray(response.data?.todos)).toBe(true);
  });

  it('should update a todo', async () => {
    const createResponse = await server.executeOperation({
      query: CREATE_TODO,
      variables: {
        title: 'Update Test',
        description: 'This will be updated',
        status: 'pending',
      },
    });

    const todoId = createResponse.data?.createTodo.id;

    const updateResponse = await server.executeOperation({
      query: UPDATE_TODO,
      variables: {
        id: todoId,
        title: 'Updated Title',
        description: 'Updated Description',
        status: 'completed',
      },
    });

    expect(updateResponse.errors).toBeUndefined();
    expect(updateResponse.data?.updateTodo.title).toBe('Updated Title');
    expect(updateResponse.data?.updateTodo.description).toBe('Updated Description');
    expect(updateResponse.data?.updateTodo.status).toBe('completed');
  });

  it('should delete a todo', async () => {
    const createResponse = await server.executeOperation({
      query: CREATE_TODO,
      variables: {
        title: 'Delete Test',
        description: 'This will be deleted',
        status: 'pending',
      },
    });

    const todoId = createResponse.data?.createTodo.id;

    const deleteResponse = await server.executeOperation({
      query: DELETE_TODO,
      variables: {
        id: todoId,
      },
    });

    expect(deleteResponse.errors).toBeUndefined();
    expect(deleteResponse.data?.deleteTodo).toBe(true);
  });
});
