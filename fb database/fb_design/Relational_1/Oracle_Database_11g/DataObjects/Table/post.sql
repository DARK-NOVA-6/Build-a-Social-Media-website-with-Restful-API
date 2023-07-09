CREATE TABLE post (
    id               INTEGER NOT NULL,
    text             VARCHAR2(2500),
    photo_url        VARCHAR2(250),
    posting_date     DATE DEFAULT sysdate,
    reactions        INTEGER DEFAULT 0,
    comments         INTEGER DEFAULT 0,
    user_account_id  INTEGER NOT NULL
)
LOGGING;