CREATE OR REPLACE TRIGGER Trg_Insert_Delete_React_Comment 
    AFTER INSERT OR DELETE ON react_comment REFERENCING 
    NEW AS new 
    OLD AS old 
    FOR EACH ROW 
    ENABLE 
IF DELETING THEN 
	update comment_post
		set reactions = reactions - 1 
		where 
			comment_post.id = :old.comment_post_id
ELSE
	update post
		set reactions = reactions + 1 
		where 
		comment_post.id = :new.comment_post_id
END IF ; 
/