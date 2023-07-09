ALTER TABLE chat
    ADD CONSTRAINT chat_user_account_fkv2 FOREIGN KEY ( user_account_id1 )
        REFERENCES user_account ( id )
            ON DELETE SET NULL
    NOT DEFERRABLE;