DROP TABLE IF EXISTS pomodoro_sessions;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE pomodoro_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  task_id INT,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  duration_minutes INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE SET NULL
);

-- Insert sample data (unchanged)
INSERT INTO users (username, email, password) VALUES
('alice', 'alice@example.com', 'hashed_pw1'),
('bob', 'bob@example.com', 'hashed_pw2'),
('carol', 'carol@example.com', 'hashed_pw3'),
('dave', 'dave@example.com', 'hashed_pw4'),
('eve', 'eve@example.com', 'hashed_pw5'),
('frank', 'frank@example.com', 'hashed_pw6'),
('grace', 'grace@example.com', 'hashed_pw7'),
('heidi', 'heidi@example.com', 'hashed_pw8'),
('ivan', 'ivan@example.com', 'hashed_pw9'),
('judy', 'judy@example.com', 'hashed_pw10');

INSERT INTO tasks (user_id, title, description, completed) VALUES
(1, 'Read React docs', 'Focus on useEffect section', FALSE),
(2, 'Fix login bug', 'Check auth token issue', TRUE),
(3, 'Write blog post', 'Topic: Web Security', FALSE),
(4, 'Study MySQL JOINs', 'Practice INNER and LEFT joins', FALSE),
(5, 'Update resume', 'Add recent React projects', TRUE),
(6, 'Prepare presentation', 'Topic: REST API design', FALSE),
(7, 'Test mobile UI', 'Ensure responsiveness on iPhone', TRUE),
(8, 'Deploy project', 'Push to Vercel & set env vars', FALSE),
(9, 'Sketch wireframes', 'Design for new landing page', FALSE),
(10, 'Backup database', 'Run SQL dump before update', TRUE);

INSERT INTO pomodoro_sessions (user_id, task_id, start_time, end_time, duration_minutes) VALUES
(1, 1, '2024-06-10 09:00:00', '2024-06-10 09:25:00', 25),
(1, NULL, '2024-06-10 10:00:00', '2024-06-10 10:25:00', 25),
(2, 2, '2024-06-11 14:00:00', '2024-06-11 14:25:00', 25),
(3, 3, '2024-06-12 16:00:00', '2024-06-12 16:25:00', 25),
(4, NULL, '2024-06-13 08:00:00', '2024-06-13 08:25:00', 25),
(5, 5, '2024-06-14 18:00:00', '2024-06-14 18:25:00', 25),
(6, NULL, '2024-06-15 11:00:00', '2024-06-15 11:25:00', 25),
(7, 7, '2024-06-16 07:00:00', '2024-06-16 07:25:00', 25),
(8, 8, '2024-06-17 12:00:00', '2024-06-17 12:25:00', 25),
(9, NULL, '2024-06-18 15:00:00', '2024-06-18 15:25:00', 25);