--  ERROR: FK name length exceeds maximum allowed length(30) 
ALTER TABLE request_friendship
    ADD CONSTRAINT request_friendship_user_account_fk FOREIGN KEY ( user_account_id )
        REFERENCES user_account ( id )
            ON DELETE CASCADE
    NOT DEFERRABLE;