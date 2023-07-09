const {execute, execute_function} = require('../query_executor');

_add_post =
    async (text, photo_url, user_account_id) => {
      const query = 'insert into post (text, photo_url, user_account_id) ' +
          'values (:text, :photo_url, :user_account_id)';
      const binds = [text, photo_url, user_account_id];
      const result = await execute(query, binds);
      if (result.error)
        return {msg: result.error};
      else
        return true;
    };
_update_post =
    async (text, photo_url, user_id, post_id) => {
      if (text === null && photo_url === null)
        return false;
      const query = [
        'update post set text = :text where id = :post_id and user_account_id = :user_id',
        'update post set photo_url = :photo_url where id = :post_id and user_account_id = :user_id',
      ];
      const binds = [[text, post_id, user_id], [photo_url, post_id, user_id]];
      for (let i = 0; i < 4; i++)
        await execute(query[i % 2], binds[i % 2]);
      return true;
    };

_get_next_post_user =
    async (user_id, user_account_id, sort_type) => {
      const query = 'declare ret integer; begin :ret := get_best_by_userid(' +
          user_id + ',' + user_account_id + ',' + sort_type + ');  end;';
      return await execute_function(query);
    };

_get_next_post =
    async (user_id, sort_type) => {
      const query = 'declare ret integer; begin :ret := get_best(' + user_id +
          ',' + sort_type + ');  end;';
      return await execute_function(query);
    };

_get_post_by_id =
    async (post_id) => {
      const query = 'select * from post where post.id = :id';
      return (await execute(query, [post_id])).data[0];
    };

_mark_seen =
    async (user_id, post_id) => {
      const query = 'begin mark_seen(:post_id, :user_id); end;';
      const binds = [post_id, user_id];
      await execute(query, binds);
    };

_delete_post =
    async (post_id, user_id) => {
      const query = 'delete from post where id = :post_id and user_account_id = :user_id';
      const binds = [post_id, user_id];
      await execute(query, binds);
    };
module.exports = {
  add_post: _add_post,
  delete_post: _delete_post,
  update_post: _update_post,
  get_next_post: _get_next_post,
  get_next_post_user: _get_next_post_user,
  get_post_by_id: _get_post_by_id,
  mark_seen: _mark_seen,
};