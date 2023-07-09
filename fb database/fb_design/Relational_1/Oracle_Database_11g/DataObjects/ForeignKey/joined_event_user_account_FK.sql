ALTER TABLE joined_event
    ADD CONSTRAINT joined_event_user_account_fk FOREIGN KEY ( user_account_id )
        REFERENCES user_account ( id )
            ON DELETE CASCADE
    NOT DEFERRABLE;