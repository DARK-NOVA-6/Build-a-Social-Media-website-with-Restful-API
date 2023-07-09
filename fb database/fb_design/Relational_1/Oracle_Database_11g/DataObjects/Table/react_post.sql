CREATE TABLE react_post (
    id                 INTEGER NOT NULL,
    post_id            INTEGER NOT NULL,
    reactions_type_id  INTEGER NOT NULL,
    user_account_id    INTEGER NOT NULL
)
LOGGING;