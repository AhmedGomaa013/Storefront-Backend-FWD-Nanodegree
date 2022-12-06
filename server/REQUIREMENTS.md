# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index '/products' get
- Show '/products/:id' get
- Create '/products' post [token required]

#### Users
- Index '/users' get [token required]
- Show '/users/:id' get [token required]
- Create New '/users/create' post
- Authenticate '/users/authenticate' post

#### Orders
- Get Active Orders by user '/orders/active' get [token required]
- Get Completed Orders by user '/orders/completed' get [token required]
- Create New Order '/orders' post [token required]
- Update Existing Order '/orders' put [token required]

## Data Shapes
#### Product
Column | Type | Is Primary Key | Is Foreign Key
--- | --- | --- | ---
id | integer | true | false
name | varchar(100) | false | false
price | float(10) | false | false

#### User
Column | Type | Is Primary Key | Is Foreign Key
--- | --- | --- | ---
id | integer | true | false
firstName | varchar(100) | false | false
lastName | varchar(100) | false | false
username | varchar(100) | false | false
password | varchar(100) | false | false


#### Orders
Column | Type | Is Primary Key | Is Foreign Key
--- | --- | --- | ---
id | integer | true | false
user_id | bigint | false | true
status of order | varchar(10) | false | false


#### Products_Orders
Column | Type | Is Primary Key | Is Foreign Key
--- | --- | --- | ---
id | integer | true | false
product_id | bigint | false | true
order_id | bigint | false | true
quantity | integer | false | false

