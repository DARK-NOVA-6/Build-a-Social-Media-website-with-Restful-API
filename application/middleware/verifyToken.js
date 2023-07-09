const jwt = require('jsonwebtoken');
const {refresh_jwt_token} = require('../controllers/auth_controller');

_verifyToken = async (req, res, next) => {
  let {jwt_access, jwt_refresh} = req.cookies;
  if (!jwt_access)
    if (jwt_refresh)
      jwt.verify(jwt_refresh, process.env.SECRET_REFRESH_TOKEN, {},
          async (err, decoded) => {
            if (err)
              return res.sendStatus(401);
            if (await refresh_jwt_token(decoded.user.id, res)) {
              req.user = decoded.user;
              next();
            } else
              return res.sendStatus(401);
          });
    else
      return res.sendStatus(403);
  else
    jwt.verify(jwt_access, process.env.SECRET_ACCESS_TOKEN, {},
        (err, decoded) => {
          if (err)
            return res.sendStatus(401);
          req.user = decoded.user;
          next();
        });
};

module.exports = {
  verifyToken: _verifyToken,
};
