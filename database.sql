CREATE DATABASE IF NOT EXISTS diary;
USE diary;

-- Create a table for users and user profiles
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    birthday DATE NOT NULL,
    phonenumber VARCHAR(15) NOT NULL,
    gender ENUM('mies', 'nainen') NOT NULL,
    height INT,
    exercise_frequency ENUM('0-1', '2-3', '4-6', '7+') NOT NULL,
    sleep_quality ENUM('huono', 'ihan ok', 'hyvä', 'extrahyvä') NOT NULL,
    stress_level ENUM('matala', 'keskinkertainen', 'korkea', 'extrakorkea') NOT NULL,
    institution VARCHAR(100) NOT NULL, 
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP 
);



CREATE TABLE KubiosData (entry_id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, entry_date DATE NOT NULL, readiness INT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES Users(user_id))
INSERT INTO KubiosData (user_id, entry_date, readiness, created_at) VALUES
  (5, '2024-02-10', 88, '2024-02-10 20:00:00');
  (5, '2024-03-10', 50, '2024-03-10 20:00:00');
  (5, '2024-04-10', 40, '2024-04-10 20:00:00');
  (5, '2024-05-10', 95, '2024-05-10 20:00:00');



  CREATE TABLE DiaryEntries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    entry_date DATE NOT NULL,
    mood INT,
    sleep_hours INT,
    weight DECIMAL(5,2),
    exercise_duration INT,
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);



CREATE TABLE hrvData (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    --Entyry date tulee siten suoraan cubios kun toimii niin tähän
    hrvValue INT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);


