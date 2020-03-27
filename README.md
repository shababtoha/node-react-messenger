# React-GraphQL Messenger

## Requirements

1. `NodeJS v8.0` or above
1. `npm v6.0` or above
1. `PostgreSQL v10.0` or above

## Setup database

create a database named `messenger` in postgresql

## Migrate with Sequelize and run server

```sh
cd PROJECT_DIRECTORY/server

# config.json contains configurations for sequelize
cp config/config.example config/config.json
```

open `config.json`\
add `username` and `password` of the postgresql database

```sh
# install required packages
npm install
npm install --save sequelize-cli

# run migrations with sequelize
npx sequelize-cli db:migrate

# run server
node server
```

## Setup and run React app

open another terminal

```sh
cd PROJECT_DIRECTORY/client

# install front-end packages
npm install

#run app
npm start
```
