ALTER TABLE request_friendship ADD CONSTRAINT request_friendship_ck_1 CHECK ( user_account_id != user_account_id1 );

ALTER TABLE request_friendship ADD CONSTRAINT request_friendship_pk PRIMARY KEY ( id );