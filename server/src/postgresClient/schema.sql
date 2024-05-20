CREATE TABLE users (
    id UUID PRIMARY KEY,
    firstName VARCHAR(128),
    secondName VARCHAR(128),
    email VARCHAR(200),
    password VARCHAR(300),
    role VARCHAR(50),
    isSubscribed BOOLEAN,
    freeTokens SMALLINT
);

CREATE TABLE test_data (
    id Serial PRIMARY KEY,
    subject VARCHAR(128),
    statment TEXT,
    optionA TEXT,
    optionB TEXT,
    optionC TEXT,
    correct VARCHAR(10),
    explaination TEXT,
    paper_year SMALLINT,
    difficulty VARCHAR(10)
);

CREATE TABLE user_overall_data (
    userId UUID REFERENCES users,
    subject VARCHAR(128),
    totalSolved INT,
    totalCorrect INT,
    totalIncorrect INT
);

CREATE DATABASE lms WITH OWNER postgres;
\c lms;
CREATE TABLE random (
  name VARCHAR(128),
  email VARCHAR(128)
);

INSERT INTO random(name, email) VALUES ('emily', 'emily@gmail.com');

 
