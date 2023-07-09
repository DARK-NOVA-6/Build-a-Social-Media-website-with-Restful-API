CREATE TABLE friendship (
    id                INTEGER NOT NULL,
    friendship_date   DATE DEFAULT sysdate NOT NULL,
    user_account_id   INTEGER NOT NULL,
    user_account_id1  INTEGER NOT NULL
)
LOGGING;