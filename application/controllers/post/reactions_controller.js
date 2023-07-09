const model = require('../../models/post/reactions_model');
const {get_common_data} = require('../user_controller');

_add_react_post =
    async (req, res) => {
      await model.add_react_post(req.user.id, req.params.post_id,
          req.body.react_type);
      res.sendStatus(201);
    };

_remove_react_post =
    async (req, res) => {
      await model.remove_react_post(req.user.id, req.params.post_id);
      res.sendStatus(201);
    };

_add_react_comment =
    async (req, res) => {
      await model.add_react_comment(req.user.id, req.params.comment_id,
          req.body.react_type);
      res.sendStatus(201);
    };

_remove_react_comment =
    async (req, res) => {
      await model.remove_react_comment(req.user.id,
          req.params.comment_id);
      res.sendStatus(201);
    };

__complete_data =
    async (reactions) => {
      let result = [];
      for (let resultElement of reactions)
        result.push({
          ...resultElement,
          ...await get_common_data(resultElement.user_account_id),
        });
      return result;
    };

_get_react_post =
    async (req, res) =>
        res.json(await __complete_data(
            await model.get_post_reactions(req.params.post_id, true),
        ));

_get_react_comment =
    async (req, res) =>
        res.json(await __complete_data(
            await model.get_comment_reactions(req.params.comment_id, true),
        ));

_get_simple_react_post =
    async (post_id) =>
        await model.get_post_reactions(post_id, false);

_get_simple_react_comment =
    async (comment_id) =>
        await model.get_comment_reactions(comment_id, false);

module.exports = {
  add_react_post: _add_react_post,
  remove_react_post: _remove_react_post,
  add_react_comment: _add_react_comment,
  remove_react_comment: _remove_react_comment,
  get_react_post: _get_react_post,
  get_react_comment: _get_react_comment,
  get_simple_react_post: _get_simple_react_post,
  get_simple_react_comment: _get_simple_react_comment,
};