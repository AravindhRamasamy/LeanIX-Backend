import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express, { Express, Request, Response, NextFunction } from 'express';
import { buildSchema } from 'type-graphql';
import { TodoResolver } from './resolvers/todo.resolver';
import { AppDataSource } from './config/database';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './config/swagger.json';

const startServer = async () => {
  // Initialize the database connection
  await AppDataSource.initialize();

  // Build the GraphQL schema
  const schema = await buildSchema({
    resolvers: [TodoResolver],
  });

  // Create Apollo Server
  const server = new ApolloServer({
    schema,
  });

  // Start Apollo Server
  await server.start();

  // Initialize Express app
  const app: Express = express();

  // Enable CORS
  app.use(cors({
      origin: 'http://localhost:4200', 
      methods: 'GET,POST,PUT,DELETE', 
  }));

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use(express.json());

  app.use(
    '/graphql',
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
      expressMiddleware(server, {
        context: async () => ({
          req: req as express.Request,
        }),
      })(req, res, next);
    }
  );

  // Start the server
  app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000/graphql');
  });
};

startServer().catch((err) => {
  console.error('Error starting server:', err);
});
