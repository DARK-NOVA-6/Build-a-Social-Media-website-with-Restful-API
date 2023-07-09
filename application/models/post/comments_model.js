const {execute} = require('../query_executor');

_add_comment =
    async (user_id, comment_id, post_id, text) => {
      const query = 'begin insert_comment(:p_comments_id,:p_post_id,:p_text,:p_user_id);  end;';
      const binds = [comment_id, post_id, text, user_id];
      await execute(query, binds);
    };

_delete_comment =
    async (user_id, comment_id) => {
      const query = 'begin delete_comment(:p_comments_id, :user_id);  end;';
      const binds = [comment_id, user_id];
      await execute(query, binds);
    };

_get_comments =
    async (parent_id, is_post) => {
      const query = 'select * from comments where ' +
          (is_post ? 'post_id' : 'comments_id') + ' = :parent_id';
      const binds = [parent_id];
      return (await execute(query, binds)).data;
    };

_get_comments_comment =
    async (comment_id) => _get_comments(comment_id, false);

_get_comments_post =
    async (post_id) => _get_comments(post_id, true);

_add_comment_comment =
    async (user_id, comment_id, text) =>
        _add_comment(user_id, comment_id, null, text);

_add_comment_post =
    async (user_id, post_id, text) =>
        _add_comment(user_id, null, post_id, text);

_update_comment =
    async (user_id, comment_id, text) => {
      const query = 'update comments set text = :text ' +
          ' where user_account_id = :user_id and id = :comment_id';
      const binds = [text, user_id, comment_id];
      await execute(query, binds);
    };

module.exports = {
  add_comment_comment: _add_comment_comment,
  add_comment_post: _add_comment_post,
  update_comment: _update_comment,
  delete_comment: _delete_comment,
  get_comments_post: _get_comments_post,
  get_comments_comment: _get_comments_comment,
};
