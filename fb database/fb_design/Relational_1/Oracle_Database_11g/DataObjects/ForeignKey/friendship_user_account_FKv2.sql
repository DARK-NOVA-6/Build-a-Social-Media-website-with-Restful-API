ALTER TABLE friendship
    ADD CONSTRAINT friendship_user_account_fkv2 FOREIGN KEY ( user_account_id1 )
        REFERENCES user_account ( id )
            ON DELETE CASCADE
    NOT DEFERRABLE;