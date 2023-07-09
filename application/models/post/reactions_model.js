const {execute} = require('../query_executor');

_remove_react =
    async (user_id, foreign_id, is_post) => {
      const query = 'delete from reactions where ' +
          (is_post ? 'post_id' : 'comments_id') +
          ' = :foreign_id and user_account_id = :user_id';
      const binds = [foreign_id, user_id];
      await execute(query, binds);
    };

_add_react =
    async (user_id, foreign_id, react_type, is_post) => {
      await _remove_react(user_id, foreign_id, is_post);
      const query = 'insert into reactions (' +
          (is_post ? 'post_id' : 'comments_id') +
          ' , user_account_id , reactions_type_id) values (:foreign_id, :user_id, ' +
          ' (select id from reactions_type where reactions_type.title = :react_type) )';
      const binds = [foreign_id, user_id, react_type];
      await execute(query, binds);
    };

_get_simple_reactions =
    async (foreign_id, is_post) => {
      const query = 'select title, count(*) as counter from reactions , reactions_type' +
          ' where reactions_type.id = reactions_type_id and ' +
          (is_post ? 'post_id' : 'comments_id') +
          ' = :foreign_id group by title';
      return (await execute(query, [foreign_id])).data;
    };

_get_full_reactions =
    async (foreign_id, is_post) => {
      const query = 'select title, user_account_id from reactions , reactions_type' +
          ' where reactions_type.id = reactions_type_id and ' +
          (is_post ? 'post_id' : 'comments_id') + ' = :foreign_id';
      return (await execute(query, [foreign_id])).data;
    };

_get_reactions =
    async (foreign_id, is_post, full_detail) => {
      if (full_detail)
        return await _get_full_reactions(foreign_id, is_post);
      else
        return await _get_simple_reactions(foreign_id, is_post);
    };

_remove_react_post =
    async (user_id, post_id) =>
        _remove_react(user_id, post_id, true);

_add_react_post =
    async (user_id, post_id, react_type) =>
        _add_react(user_id, post_id, react_type, true);

_remove_react_comment =
    async (user_id, comment_id) =>
        _remove_react(user_id, comment_id, false);

_add_react_comment =
    async (user_id, comment_id, react_type) =>
        _add_react(user_id, comment_id, react_type, false);

_get_comment_reactions =
    async (comment_id, full_detail) =>
        _get_reactions(comment_id, false, full_detail);

_get_post_reactions =
    async (post_id, full_detail) =>
        _get_reactions(post_id, true, full_detail);

module.exports = {
  get_post_reactions: _get_post_reactions,
  get_comment_reactions: _get_comment_reactions,
  add_react_comment: _add_react_comment,
  remove_react_comment: _remove_react_comment,
  add_react_post: _add_react_post,
  remove_react_post: _remove_react_post,
};