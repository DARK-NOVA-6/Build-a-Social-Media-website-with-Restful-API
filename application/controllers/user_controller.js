const bcrypt = require('bcryptjs');
const model = require('../models/user_model');

_signup =
    async (req, res) => {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);
      const {username, email, first_name, last_name} = req.body;
      const result = await model.create(username, email, password, first_name,
          last_name);
      if (result === true)
        return res.sendStatus(201);
      else
        res.sendStatus(400);
    };

_login =
    async (req, res) => {
      const {username, password} = req.body;
      const user = await model.get_by_username(username);
      if (user.length > 0) {
        const checked = await bcrypt.compare(password, user[0].password);
        if (checked === true) {
          const data = _get_shared_data(user[0]);
          const {user_logged_in} = require('./auth_controller');
          await user_logged_in(data, res);
          return res.json('login done');
        }
      }
      return res.sendStatus(400);
    };

_logout =
    async (req, res) => {
      const user_id = req.user.id;
      const {user_logged_out} = require('./auth_controller');
      await user_logged_out(user_id, res);
      return res.json('logout done');
    };

_available_username =
    async (username) => {
      const user = await model.get_by_username(username);
      return user.length === 0;
    };

_get_by_id =
    async (user_id) => {
      let user = await model.get_by_id(user_id);
      return user ? _get_shared_data(user) : null;
    };

_update_jwt_refresh_mid =
    async (user_id, jwt_refresh) => {
      await model.update_jwt_refresh(user_id, jwt_refresh);
    };

_get_shared_data =
    (user) => {
      return {
        user: {
          username: user.username,
          id: user.id,
          name: user.first_name + ' ' + user.last_name,
          photo: user.photo_url,
        },
      };
    };

_get_common_data =
    async (user_id) => {
      const user = await model.get_by_id(user_id);
      let result = {};
      result.user_name = user.first_name + ' ' + user.last_name;
      result.user_photo = user.photo_url;
      return result;
    };

module.exports = {
  signup: _signup,
  login: _login,
  logout: _logout,
  available_username: _available_username,
  get_by_id: _get_by_id,
  update_jwt_refresh: _update_jwt_refresh_mid,
  get_common_data: _get_common_data,
};