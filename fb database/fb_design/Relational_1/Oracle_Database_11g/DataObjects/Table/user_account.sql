CREATE TABLE user_account (
    id          INTEGER NOT NULL,
    username    VARCHAR2(100) NOT NULL,
    email       VARCHAR2(250) NOT NULL,
    password    VARCHAR2(250) NOT NULL,
    first_name  VARCHAR2(65) NOT NULL,
    last_name   VARCHAR2(65) NOT NULL,
    photo_url   VARCHAR2(250),
    birthdate   DATE
)
LOGGING;