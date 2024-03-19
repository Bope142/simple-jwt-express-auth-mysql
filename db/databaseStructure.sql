--They should be run in a MySQL command-line interface such as MySQL Shell,
-- MySQL Command-Line Client, or any MySQL database management tool like MySQL Workbench.

-- Create a new user with appropriate privileges
CREATE USER 'add_your_username_here'@'%' IDENTIFIED BY 'password_of_user';

-- Grant all privileges on the simple_auth_database to the created user
GRANT ALL PRIVILEGES ON simple_auth_database.* TO 'username'@'%';

-- Grant all privileges on tables with names starting with simple_auth_database_ to the created user
GRANT ALL PRIVILEGES ON `simple_auth_database\_%`.* TO 'username'@'%';

-- Flush privileges to apply changes
FLUSH PRIVILEGES;

-- Create the simple_auth_database with UTF-8 character set
CREATE DATABASE simple_auth_database CHARACTER SET 'utf8';

-- Create the users table with appropriate columns and data types
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin', 'superAdmin', 'manager') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
