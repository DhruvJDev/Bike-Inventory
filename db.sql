CREATE DATABASE IF NOT EXISTS bike_inventory;
USE bike_inventory;

CREATE TABLE IF NOT EXISTS bikes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    model_name VARCHAR(100) NOT NULL,
    quantity INT DEFAULT 0
);

INSERT INTO bikes (model_name, quantity) VALUES
('Hero Splendor Plus', 10),
('Hero HF Deluxe', 8),
('Hero Glamour', 5),
('Hero Passion Pro', 7),
('Hero Xtreme 125R', 4);
