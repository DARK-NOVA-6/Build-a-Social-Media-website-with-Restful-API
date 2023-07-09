CREATE TABLE chat (
    id                INTEGER NOT NULL,
    last_date         DATE NOT NULL,
    number_unread     INTEGER DEFAULT 0,
    user_account_id   INTEGER,
    user_account_id1  INTEGER
)
LOGGING;