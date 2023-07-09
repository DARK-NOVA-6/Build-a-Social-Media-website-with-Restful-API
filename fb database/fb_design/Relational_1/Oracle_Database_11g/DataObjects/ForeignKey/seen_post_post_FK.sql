ALTER TABLE seen_post
    ADD CONSTRAINT seen_post_post_fk FOREIGN KEY ( post_id )
        REFERENCES post ( id )
            ON DELETE CASCADE
    NOT DEFERRABLE;