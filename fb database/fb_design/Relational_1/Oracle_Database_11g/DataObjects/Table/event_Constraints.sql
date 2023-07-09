ALTER TABLE event ADD CONSTRAINT event_ck_1 CHECK ( announcement_date <= event_date );

ALTER TABLE event ADD CONSTRAINT event_pk PRIMARY KEY ( id );