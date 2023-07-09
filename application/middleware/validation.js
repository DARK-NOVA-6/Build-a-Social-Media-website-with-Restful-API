const {validationResult} = require('express-validator');
const {available_username} = require('../controllers/user_controller');

_register_validator =
    async (req, res, next) => {
      const {errors} = validationResult(req), msg = [];
      const {password, conf_password, username} = req.body;
      if (password !== conf_password)
        errors.push({msg: 'Password and confirm password do not match'});
      if (!await available_username(username))
        errors.push({msg: 'Username is already in use'});
      for (const error of errors)
        msg.push(error.msg);
      if (msg.length > 0)
        return res.json(msg);
      else
        next();
    };
module.exports = {
  register_validator: _register_validator,
};
