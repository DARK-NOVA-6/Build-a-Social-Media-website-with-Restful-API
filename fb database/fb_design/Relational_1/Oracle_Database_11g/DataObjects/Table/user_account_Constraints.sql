ALTER TABLE user_account ADD CONSTRAINT user_pk PRIMARY KEY ( id );

ALTER TABLE user_account ADD CONSTRAINT user__un UNIQUE ( email );