/* Replace with your SQL commands */
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    status varchar(10),
    user_id bigint REFERENCES users(id)
);