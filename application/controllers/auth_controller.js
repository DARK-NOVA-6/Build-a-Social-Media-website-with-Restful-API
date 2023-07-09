const jwt = require('jsonwebtoken');
const {update_jwt_refresh, get_by_id} = require('./user_controller');

const expiresIn_access = 15 * 2;
const expiresIn_refresh = 60 * 60;

_create_access_token =
    async data => {
      return await jwt.sign(data, process.env.SECRET_ACCESS_TOKEN,
          {expiresIn: expiresIn_access}, null);
    };

_create_refresh_token =
    async data => {
      return await jwt.sign(data, process.env.SECRET_REFRESH_TOKEN,
          {expiresIn: expiresIn_refresh}, null);
    };

_user_logged_in =
    async (user_info, response) => {
      const jwt_access = await _create_access_token(user_info);
      const jwt_refresh = await _create_refresh_token(user_info);
      response.cookie(
          'jwt_refresh', jwt_refresh,
          {httpOnly: true, maxAge: expiresIn_refresh * 1000, secure: true},
      );
      
      response.cookie(
          'jwt_access', jwt_access,
          {httpOnly: true, maxAge: expiresIn_access * 1000, secure: true},
      );
      await update_jwt_refresh(user_info.user.id, jwt_refresh);
    };

_user_logged_out =
    async (user_id, response) => {
      response.cookie('jwt_refresh', '',
          {httpOnly: true, maxAge: 0, secure: true});
      response.cookie('jwt_access', '',
          {httpOnly: true, maxAge: 0, secure: true});
      await update_jwt_refresh(user_id, null);
    };

_refresh_jwt_token =
    async (user_id, response) => {
      const result = await get_by_id(user_id);
      if (result) {
        await _user_logged_in(result, response);
        return true;
      } else
        return false;
    };

module.exports = {
  user_logged_in: _user_logged_in,
  user_logged_out: _user_logged_out,
  refresh_jwt_token: _refresh_jwt_token,
};

