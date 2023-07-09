ALTER TABLE react_post
    ADD CONSTRAINT react_post_user_account_fk FOREIGN KEY ( user_account_id )
        REFERENCES user_account ( id )
            ON DELETE CASCADE
    NOT DEFERRABLE;