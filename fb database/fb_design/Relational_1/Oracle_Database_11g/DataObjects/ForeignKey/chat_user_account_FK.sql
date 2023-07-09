ALTER TABLE chat
    ADD CONSTRAINT chat_user_account_fk FOREIGN KEY ( user_account_id )
        REFERENCES user_account ( id )
            ON DELETE SET NULL
    NOT DEFERRABLE;