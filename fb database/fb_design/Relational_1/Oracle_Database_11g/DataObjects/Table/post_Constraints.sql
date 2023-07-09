ALTER TABLE post
    ADD CONSTRAINT post_ck_1 CHECK ( text IS NOT NULL
                                     OR photo_url IS NOT NULL );

ALTER TABLE post ADD CONSTRAINT post_pk PRIMARY KEY ( id );