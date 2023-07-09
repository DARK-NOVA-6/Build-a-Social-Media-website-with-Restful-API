CREATE TABLE react_comment (
    id                 INTEGER NOT NULL,
    comment_post_id    INTEGER NOT NULL,
    reactions_type_id  INTEGER NOT NULL,
    user_account_id    INTEGER NOT NULL
)
LOGGING;