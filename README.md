# Storefront-Backend-FWD-Nanodegree

An backend project for stores that contains APIs to create users and authenticate them throught JWT, products and orders and update the orders. The project stores users data with their orders in database and uses postgresql and db-migrate as an ORM.

# Usage

- Clone the files to your computer.
- Update the dependencies using 'npm i'
- Download postgresdb database in your machine.
- create **two(2)** empty databases: one for development and the other for testing.
- Update Environment file **.env** with the names of databases, host, database user and database password.
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
