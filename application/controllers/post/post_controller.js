const model = require('../../models/post/post_model');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const path_uploaded_images = __dirname +
    '..\\..\\..\\storage\\uploaded_images\\';

_extract_photo =
    async (req) => {
      if (req.file) {
        const photo_name = await _get_unique_file_name(
            path.extname(req.file.originalname).toLowerCase(),
        );
        const targetPath = path.join(path_uploaded_images + photo_name);
        await fs.rename(req.file.path, targetPath, () => {});
        return photo_name;
      } else
        return null;
    };

_add_post =
    async (req, res) => {
      const photo_name = await _extract_photo(req);
      const {text} = req.body;
      const result = await model.add_post(text, photo_name, req.user.id);
      if (result === true)
        return res.sendStatus(201);
      else
        return res.sendStatus(400);
    };

_update_post =
    async (req, res) => {
      const photo_name = await _extract_photo(req);
      const {text, post_id} = req.body;
      const result = await model.update_post(text, photo_name, req.user.id,
          post_id);
      if (result === true)
        return res.sendStatus(201);
      else
        return res.sendStatus(400);
    };

_get_unique_file_name =
    async (suffix) => {
      while (true) {
        const random = crypto.randomBytes(20).toString('hex') + suffix;
        const file_path = path.join(path_uploaded_images + random);
        if (!fs.existsSync(file_path))
          return random;
      }
    };

_get_post_by_id =
    async (post_id) => {
      const {get_common_data} = require('../user_controller');
      const {get_simple_react_post}
          = require('./reactions_controller');
      let result = await model.get_post_by_id(post_id);
      // console.log(result);
      result.counter_comments = result.comments;
      delete result.comments;
      
      result.counter_reactions = result.reactions;
      result.reactions = await get_simple_react_post(post_id);
      
      result.author = await get_common_data(result.user_account_id);
      return result;
    };

_get_next_post =
    async (req, res) => {
      const post_id = await model.get_next_post(req.user.id,
          req.params.sort_type);
      if (post_id === -1)
        return null;
      else
        return res.json(await _get_post_by_id(post_id));
    };

_get_next_post_user =
    async (req, res) => {
      const post_id = await model.get_next_post_user(req.user.id,
          req.params.user_id, req.params.sort_type);
      if (post_id === '-1')
        return null;
      else
        return res.json(await _get_post_by_id(post_id));
    };

_mark_seen =
    async (req, res) => {
      await model.mark_seen(req.user.id, req.params.post_id);
      res.sendStatus(201);
    };

_delete_post =
    async (req, res) => {
      await model.delete_post(req.params.post_id, req.user.id);
      return res.sendStatus(201);
    };

module.exports = {
  add_post: _add_post,
  delete_post: _delete_post,
  get_next_post: _get_next_post,
  get_next_post_user: _get_next_post_user,
  mark_seen: _mark_seen,
  update_post: _update_post,
};