ALTER TABLE comment_post
    ADD CONSTRAINT comment_post_post_fk FOREIGN KEY ( post_id )
        REFERENCES post ( id )
            ON DELETE CASCADE
    NOT DEFERRABLE;