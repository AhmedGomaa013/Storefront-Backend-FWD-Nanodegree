/* Replace with your SQL commands */
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname varchar(100),
    lastname varchar(100),
    username varchar(100),
    password varchar(100)
);

INSERT INTO users(firstname, lastname, username, password)
VALUES('admin', 'admin', 'admin', '$2a$10$35mAXwKrU0NwECHjiyzsEOiqPBdViNqkMVrMyU1/6bsNMS0sn6Z4e');