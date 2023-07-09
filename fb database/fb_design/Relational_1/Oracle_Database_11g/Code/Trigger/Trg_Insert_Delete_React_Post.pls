CREATE OR REPLACE TRIGGER Trg_Insert_Delete_React_Post 
    AFTER INSERT OR DELETE ON react_post REFERENCING 
    NEW AS new 
    OLD AS old 
    FOR EACH ROW 
    ENABLE 
IF DELETING THEN 
	update post
		set reactions = reactions - 1 
		where 
			post.id = :old.post_id
ELSE
	update post
		set reactions = reactions + 1 
		where 
			post.id = :new.post_id
END IF ; 
/