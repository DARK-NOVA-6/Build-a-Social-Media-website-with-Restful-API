ALTER TABLE react_comment
    ADD CONSTRAINT react_comment_user_account_fk FOREIGN KEY ( user_account_id )
        REFERENCES user_account ( id )
            ON DELETE CASCADE
    NOT DEFERRABLE;