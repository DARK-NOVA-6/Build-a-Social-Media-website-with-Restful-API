CREATE OR REPLACE TRIGGER Trg_Insert_Delete_Comment 
    BEFORE INSERT OR DELETE ON comment_post REFERENCING 
    NEW AS new 
    OLD AS old 
    FOR EACH ROW 
    ENABLE 
IF DELETING THEN 
	update post
		set comments = comments  - 1 
		where post.id = :old.post_id ;
ELSE
	update post
		set comments = comments  + 1 
		where post.id = :new.post_id ;
END IF; 
/