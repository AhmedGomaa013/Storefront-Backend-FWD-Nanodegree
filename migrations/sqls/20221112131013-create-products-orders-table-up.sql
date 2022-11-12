/* Replace with your SQL commands */
CREATE TABLE products_orders(
    id SERIAL PRIMARY KEY,
    product_id bigint REFERENCES products(id),
    order_id bigint REFERENCES orders(id),
    quantity integer
);