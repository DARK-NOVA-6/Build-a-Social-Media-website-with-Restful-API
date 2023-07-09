--  ERROR: FK name length exceeds maximum allowed length(30) 
ALTER TABLE react_comment
    ADD CONSTRAINT react_comment_reactions_type_fk FOREIGN KEY ( reactions_type_id )
        REFERENCES reactions_type ( id )
            ON DELETE CASCADE
    NOT DEFERRABLE;