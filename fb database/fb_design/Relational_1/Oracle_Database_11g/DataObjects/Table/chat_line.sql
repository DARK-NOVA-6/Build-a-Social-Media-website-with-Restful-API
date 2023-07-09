CREATE TABLE chat_line (
    id             INTEGER NOT NULL,
    message        VARCHAR2(500) NOT NULL,
    send_date      DATE DEFAULT sysdate NOT NULL,
    received_date  DATE,
    read_time      DATE,
    send_from      INTEGER NOT NULL,
    chat_id        INTEGER NOT NULL
)
LOGGING;

ALTER TABLE chat_line
    ADD CHECK ( send_from IN ( 1, 2 ) );