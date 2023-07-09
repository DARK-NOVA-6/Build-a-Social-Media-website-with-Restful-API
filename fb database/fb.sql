ALTER SESSION SET nls_date_format = 'DD-MM-YYYY HH24:MI:SS';
COMMIT;

UPDATE user_account SET jwt_refresh = NULL;
COMMIT;

UPDATE post SET reactions = 0;
COMMIT;

UPDATE post SET comments = 0;
COMMIT;
delete from event ;
commit ;
SELECT * FROM event;
SELECT * FROM joined_event;
SELECT * FROM joined_event;
SELECT * FROM post;
SELECT * FROM reactions;
SELECT * FROM comments;
SELECT * FROM seen_post;
SELECT * FROM user_account;

select * from chat_line 

BEGIN
    dbms_output.put_line(get_suggested_friends(44, 1 , 4));
    dbms_output.put_line(get_suggested_friends(42, 1 , 4));
END;
select * from request_friendship  ;
select * from friendship  ;
delete from request_friendship  ;
commit ;
delete from friendship  ;
commit ;

select * from chat_line ;
