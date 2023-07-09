ALTER TABLE reactions_type ADD CONSTRAINT reactions_type_pk PRIMARY KEY ( id );

ALTER TABLE reactions_type ADD CONSTRAINT reactions_type__un UNIQUE ( title );