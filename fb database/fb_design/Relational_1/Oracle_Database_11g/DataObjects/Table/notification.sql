CREATE TABLE notification (
    id               INTEGER NOT NULL,
    text             VARCHAR2(200) NOT NULL,
    event_url        VARCHAR2(200),
    event_date       DATE DEFAULT sysdate,
    seen             CHAR(1) DEFAULT 'false',
    user_account_id  INTEGER NOT NULL
)
LOGGING;