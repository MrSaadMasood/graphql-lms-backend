CREATE DATABASE lms WITH OWNER postgres;
\c lms;

CREATE TABLE users (
    id UUID PRIMARY KEY,
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    password VARCHAR(300) NOT NULL,
    role VARCHAR(50) NOT NULL,
    is_subscribed BOOLEAN NOT NULL,
    free_tokens SMALLINT NOT NULL,
    login_method VARCHAR(50) NOT NULL
);

CREATE TABLE test_data (
    id Serial PRIMARY KEY,
    subject VARCHAR(128) NOT NULL,
    statment TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    correct VARCHAR(10) NOT NULL,
    explaination TEXT,
    paper_year SMALLINT NOT NULL,
    difficulty VARCHAR(10) NOT NULL
);

CREATE TABLE user_overall_data (
    userId UUID REFERENCES users,
    subject VARCHAR(128) NOT NULL,
    total_solved INT NOT NULL,
    total_correct INT NOT NULL,
    total_incorrect INT NOT NULL
);

CREATE TABLE tokens ( 
    id UUID REFERENCES users,
    token VARCHAR(300) NOT NULL
);
 
INSERT INTO users (id, first_name, last_name, email, password, role, is_subscribed  , free_tokens, login_method) 
VALUES ( 'f415284b-87b4-4206-a79f-5bd61b00de97', 'hamza', 'saleem', 'hamza@gmail.com', 
'$2a$10$Aqb2UA6V6n/p6tJZPUWvre3HnSef3WX/v822L7x9RxHT0mJXkx9w6', 'user', false, 300, 'normal');
