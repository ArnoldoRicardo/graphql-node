CREATE TABLE IF NOT EXISTS Person (
    id serial NOT NULL PRIMARY KEY
    , name varchar(100) UNIQUE
    , phone varchar(10)
    , city varchar(100)
    , street varchar(100)
);

CREATE TABLE IF NOT EXISTS "User" (
    id serial NOT NULL PRIMARY KEY
    , username varchar(100) UNIQUE
    , hasshed_password varchar
);

CREATE TABLE IF NOT EXISTS friends (
    id serial NOT NULL PRIMARY KEY
    , person_id int
    , user_id int
    , FOREIGN KEY (user_id) REFERENCES "User" (id)
    , FOREIGN KEY (person_id) REFERENCES Person (id)
);

