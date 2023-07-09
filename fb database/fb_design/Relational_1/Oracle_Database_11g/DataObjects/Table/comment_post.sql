CREATE TABLE comment_post (
    id               INTEGER NOT NULL,
    text             VARCHAR2(500) NOT NULL,
    comment_date     DATE DEFAULT sysdate,
    reactions        INTEGER DEFAULT 0,
    post_id          INTEGER NOT NULL,
    user_account_id  INTEGER NOT NULL
)
LOGGING;