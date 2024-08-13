-- SQL file to create a 'users' table with specified columns

-- Use the database (replace 'chat_app' with your actual database name)
USE chat_app;

-- Drop the table if it exists (optional)
DROP TABLE IF EXISTS users;

-- Create the 'users' table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,               -- Unique ID for each user
  name VARCHAR(100) NOT NULL,                     -- User's name
  email VARCHAR(100) NOT NULL UNIQUE,             -- User's email, unique for each user
  phone VARCHAR(15),                              -- User's phone number (optional)
  role ENUM('Student', 'Teacher', 'Institute') NOT NULL, -- User's role
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Timestamp when the record is created
);

-- Insert sample data (optional)
INSERT INTO users (name, email, phone, role) VALUES 
('Alice Johnson', 'alice.johnson@example.com', '123-456-7890', 'Student'),
('Bob Smith', 'bob.smith@example.com', '098-765-4321', 'Teacher'),
('Charlie Brown', 'charlie.brown@example.com', '555-555-5555', 'Institute');
