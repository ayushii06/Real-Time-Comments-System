CREATE DATABASES real_time_community;
USE real_time_community;

CREATE TABLE comments(
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255),
  comment TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP

);




INSERT INTO comments (username, comment) VALUES ('Alice', 'Hello World');
INSERT INTO comments (username, comment) VALUES ('Bob', 'Hi Alice');


