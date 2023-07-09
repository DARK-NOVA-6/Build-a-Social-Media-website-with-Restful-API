ALTER TABLE react_comment
    ADD CONSTRAINT react_comment_comment_post_fk FOREIGN KEY ( comment_post_id )
        REFERENCES comment_post ( id )
            ON DELETE CASCADE
    NOT DEFERRABLE;