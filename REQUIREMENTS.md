# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]

#### Users
- Index [token required]
- Show [token required]
- Create New
- Authenticate

#### Orders
- Get Active Orders by user (args: user id)[token required]
- Get Completed Orders by user (args: user id)[token required]
- Create New Order[token required]
- Update Existing Order[token required]

## Data Shapes
#### Product
-  id
- name
- price

#### User
- id
- firstName
- lastName
- username
- password

#### Orders
- id
- user_id
- status of order (ACTIVE or COMPLETED)

#### Products_Orders
- id
- product_id
- order_id
- quantity
