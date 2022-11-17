# Storefront-Backend-FWD-Nanodegree

An backend project for stores that contains APIs to create users and authenticate them throught JWT, products and orders and update the orders. The project stores users data with their orders in database and uses postgresql and db-migrate as an ORM.

# Usage

- Clone the files to your computer.
- Update the dependencies using 'npm i'
- Download postgresdb database in your machine.
- create **two(2)** empty databases: one for development and the other for testing.
- Update **database.json** file with the names of driver, host, port database, user and password in two modes.
- Create **.env** file with the follwowing environment variables:
    - POSTGRES_HOST: has the host address for the database.
    - POSTGRES_PORT: has the port number of the postgresql database. If you are using the default port set it to **5432**
    - POSTGRES_DB: has the name of database in development mode.
    - POSTGRES_DB_TEST: has the name of database in test mode.
    - POSTGRES_USER: has the name of database user.
    - POSTGRES_PASSWORD: has the password for database user.
    - PORT: has the port number to run the server.
    - ENV: has the environment you choose you run application on. Set it to **dev** as default value.
    - BCRYPT_PASSWORD: has the encrption key for encrypting passwords.
    - SALT_ROUNDS: has the number of round for encrypting passwords. It has to be a number.
    - JWT_SECRET: has the JWT secret.
- Complete database setup using **'db-migrate up'**
- Start the node server using **'npm run start'**
- To build the application use **'npm run build'**
- To run tests on the application use **'npm run test'**<br/>
##### note: You can test the APIs using postman collection I've provided in the root.

# Architecture
The project consists of one 3 controllers(orders, users and products) with total 11 endpoints, 1 middleware(, 3 services(orders, users, products), 3 models and 6 dtos.

**root**
- migrations(4 migrations)
- spec(has jasmine config).
- src
    - controllers
    - dtos
        - responses
    - middlewares
    - models
    - services
    - spec
    - app.ts
    - database.ts


# Features
- Create Users.
- Protect Users info using JWT.
- Create and View products.
- Create and Update users orders.
