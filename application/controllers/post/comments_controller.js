const model = require('../../models/post/comments_model');
const {get_common_data} = require('../user_controller');
const {get_simple_react_comment} = require('./reactions_controller');

_add_comment_comment =
    async (req, res) => {
      const {comment_id, text} = req.body;
      await model.add_comment_comment(req.user.id, comment_id, text);
      return res.sendStatus(201);
    };

_add_comment_post =
    async (req, res) => {
      const {post_id, text} = req.body;
      await model.add_comment_post(req.user.id, post_id, text);
      return res.sendStatus(201);
    };

_delete_comment =
    async (req, res) => {
      await model.delete_comment(req.user.id, req.params.comment_id);
      return res.sendStatus(201);
    };

_complete_data =
    async (comments) => {
      let result = [];
      for (let commentsElement of comments)
        result.push({
          ...commentsElement,
          author: await get_common_data(commentsElement.user_account_id),
          reactions: await get_simple_react_comment(commentsElement.id),
        });
      return result;
    };

_get_comments_comment =
    async (req, res) =>
        res.json(await _complete_data(
            await model.get_comments_comment(req.params.comment_id),
        ));

_get_comments_post =
    async (req, res) =>
        res.json(await _complete_data(
            await model.get_comments_post(req.params.post_id),
        ));

_update_comment =
    async (req, res) => {
      const {comment_id, text} = req.body;
      await model.update_comment(req.user.id, comment_id, text);
      return res.sendStatus(201);
    };

module.exports = {
  add_comment_post: _add_comment_post,
  add_comment_comment: _add_comment_comment,
  update_comment: _update_comment,
  delete_comment: _delete_comment,
  get_comments_post: _get_comments_post,
  get_comments_comment: _get_comments_comment,
};