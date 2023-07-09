ALTER TABLE react_post
    ADD CONSTRAINT react_post_post_fk FOREIGN KEY ( post_id )
        REFERENCES post ( id )
            ON DELETE CASCADE
    NOT DEFERRABLE;