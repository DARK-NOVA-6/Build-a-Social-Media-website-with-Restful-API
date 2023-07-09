ALTER TABLE joined_event
    ADD CONSTRAINT joined_event_event_fk FOREIGN KEY ( event_id )
        REFERENCES event ( id )
            ON DELETE CASCADE
    NOT DEFERRABLE;