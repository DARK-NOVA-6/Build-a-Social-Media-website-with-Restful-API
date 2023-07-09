ALTER TABLE friendship ADD CONSTRAINT friendship_ck_1 CHECK ( user_account_id != user_account_id1 );

ALTER TABLE friendship ADD CONSTRAINT friendship_pk PRIMARY KEY ( id );