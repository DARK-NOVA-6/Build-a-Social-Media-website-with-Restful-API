ALTER TABLE notification
    ADD CONSTRAINT notification_user_account_fk FOREIGN KEY ( user_account_id )
        REFERENCES user_account ( id )
            ON DELETE CASCADE
    NOT DEFERRABLE;