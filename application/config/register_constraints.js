const {check} = require('express-validator');

exports.register_constraints = [
  check('username', 'username cant be empty').notEmpty(),
  
  check('username', 'username isn\'t valid').
      exists().
      trim().
      matches(/^[a-z]+([.]?[a-z\d]+)*$/),
  
  check('email').isEmail().withMessage('invalid Email'),
  
  check('password',
      'Password must include one lowercase character, one uppercase character, a number, and a special character.').
      matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{4,}$/, 'i'),
  
  check('first_name', 'first name cant be empty').
      trim().
      notEmpty(),
  
  check('first_name', 'first name must include only alpha letters').
      exists().
      trim().
      isAlpha('en-US', {ignore: '\s'}),
  
  check('last_name', 'last name cant be empty').
      trim().
      notEmpty(),
  
  check('last_name', 'last name must include only alpha letters').
      trim().
      exists().
      isAlpha('en-US', {ignore: '\s'}),
]
;