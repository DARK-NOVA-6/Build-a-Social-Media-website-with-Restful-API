ALTER TABLE react_post
    ADD CONSTRAINT react_post_reactions_type_fk FOREIGN KEY ( reactions_type_id )
        REFERENCES reactions_type ( id )
            ON DELETE CASCADE
    NOT DEFERRABLE;