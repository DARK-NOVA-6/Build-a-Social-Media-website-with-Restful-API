CREATE TABLE seen_post (
    id               INTEGER NOT NULL,
    counter          INTEGER DEFAULT 0,
    user_account_id  INTEGER NOT NULL,
    post_id          INTEGER NOT NULL
)
LOGGING;