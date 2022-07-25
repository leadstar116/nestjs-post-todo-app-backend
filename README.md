Post Todo App - Backend

## Description

This is a backend service for post todo app.

You can check frontend code here: https://github.com/leadstar116/react-post-todo-app-frontend

Live Url: https://nestjs-posts-todo-backend.herokuapp.com/api/

## Used Stacks

- Nest.js
- Swagger API Documentation
- TypeORM
- PostgreSQL
- Jest
- Unit Test & Coverage Test

## Installation

Used node version 14 when working on this project.

```bash
$ nvm use 14
$ yarn install
```

### Database configuration

Install postgres latest version. Copy `.env.example -> .env` and config database variables.

```bash
$ yarn migration:run
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

Open browser and visit `localhost:8080/api`.

## Test

```bash
# unit tests
$ yarn test

# watching unit tests
$ yarn test:watch

# test coverage
$ yarn test:cov
```
