ALTER TABLE chat_line
    ADD CONSTRAINT chat_line_chat_fk FOREIGN KEY ( chat_id )
        REFERENCES chat ( id )
            ON DELETE CASCADE
    NOT DEFERRABLE;