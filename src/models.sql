CREATE TABLE IF NOT EXISTS Person (
    id serial NOT NULL PRIMARY KEY
    , name varchar(100) UNIQUE
    , phone varchar(10)
    , city varchar(100)
    , street varchar(100)
);

