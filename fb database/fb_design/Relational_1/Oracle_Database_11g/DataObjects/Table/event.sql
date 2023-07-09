CREATE TABLE event (
    id                 INTEGER NOT NULL,
    text               VARCHAR2(2500) NOT NULL,
    announcement_date  DATE DEFAULT sysdate,
    event_date         DATE NOT NULL,
    interested         INTEGER DEFAULT 0 NOT NULL,
    user_account_id    INTEGER
)
LOGGING;