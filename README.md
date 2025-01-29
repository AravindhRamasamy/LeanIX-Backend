# LeanIX Backend

## Overview
The LeanIX Backend is the server-side application powering the LeanIX system. It is built using Node.js and TypeScript, integrating GraphQL for API interactions.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)

## Installation
To set up the backend locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/AravindhRamasamy/LeanIX-Backend.git
   cd LeanIX-Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables:
   - Create a `.env` file in the root directory and configure database credentials, API keys, and other necessary configurations.
4. Start the PostgreSQL database using Docker:
   ```bash
   docker-compose up -d
   ```
5. Start the backend server:
   ```bash
   npm run start
   ```

## Usage
- **GraphQL API**: Runs on `http://localhost:4000/graphql`
- **Database**: Configured via `.env` file, using PostgreSQL by default.

## API Endpoints
### **GraphQL Queries**
#### **Get all Todos**
```graphql
query {
  todos {
    id
    title
    description
    status
  }
}
```
#### **Get a Single Todo by ID**
```graphql
query {
  todo(id: 1) {
    id
    title
    description
    status
  }
}
```
### **GraphQL Mutations**
#### **Create a New Todo**
```graphql
mutation {
  createTodo(title: "New Task", description: "Task description", status: "Pending") {
    id
    title
    description
    status
  }
}
```
#### **Update an Existing Todo**
```graphql
mutation {
  updateTodo(id: 1, title: "Updated Task", status: "Completed") {
    id
    title
    status
  }
}
```
#### **Delete a Todo**
```graphql
mutation {
  deleteTodo(id: 1) {
    success
    message
  }
}
```

## Project Structure
```
LeanIX-Backend/
│── src/
│   ├── resolvers/
│   ├── entities/
│   ├── config/
│   ├── database/
│── tests/
│── package.json
│── tsconfig.json
│── README.md
```

## Running Tests
To run unit and integration tests:
```bash
npm test
```

## Contributing
We welcome contributions! To contribute:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-branch`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-branch`
5. Create a Pull Request.

## License
This project is licensed under the MIT License. See `LICENSE` for more details.

