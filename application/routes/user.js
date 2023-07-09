const router = require('express').Router();
const controller = require('../controllers/user_controller');

const {register_validator} = require('../middleware/validation');
const {register_constraints} = require('../config/register_constraints');
const {verifyToken} = require('../middleware/verifyToken');

router.get('/user',
    async (req, res) =>
        res.render('index'),
);

router.post('/sign-up',
    register_constraints,
    register_validator,
    controller.signup,
);

router.post('/login', controller.login);
router.get('/logout', verifyToken, controller.logout);

exports.router = router;
