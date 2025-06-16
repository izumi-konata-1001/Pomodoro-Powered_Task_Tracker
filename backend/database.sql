DROP TABLE IF EXISTS pomodoro_sessions;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS issues;
DROP TABLE IF EXISTS users;

-- 用户表
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- issue 表（可以没有任务）
CREATE TABLE issues (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- task 表（可独立存在，但若属于 issue，则必须有 step）
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  issue_id INT,  -- 可为 NULL（独立任务）
  step_number INT,  -- 如果有 issue_id，则必须非 NULL
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (issue_id) REFERENCES issues(id) ON DELETE CASCADE,
  CONSTRAINT step_required_if_issue CHECK (
    issue_id IS NULL OR step_number IS NOT NULL
  ),
  UNIQUE (issue_id, step_number)
);

-- 用户
INSERT INTO users (username, email, password) VALUES
('alice', 'alice@example.com', 'pw1'),
('bob', 'bob@example.com', 'pw2');

-- issues
INSERT INTO issues (user_id, title, description) VALUES
(1, 'Frontend Revamp', 'Update UI components and layout'),
(2, 'Authentication Fixes', 'Resolve login token issues'),
(1, 'Empty issue', 'Has no tasks yet');

-- 归属于 issue 的任务（必须有 step_number）
INSERT INTO tasks (user_id, issue_id, step_number, title, description, completed) VALUES
(1, 1, 1, 'Refactor Header', 'Responsive layout', FALSE),
(1, 1, 2, 'Update Button Style', 'Improve CTA buttons', TRUE),
(2, 2, 1, 'Fix Token Bug', 'Token not saving', FALSE);

-- 独立任务（无 issue_id，无 step_number）
INSERT INTO tasks (user_id, issue_id, step_number, title, description, completed) VALUES
(1, NULL, NULL, 'Write blog post', 'Topic: UI/UX', FALSE),
(2, NULL, NULL, 'Experiment with animations', 'GSAP trial', TRUE);