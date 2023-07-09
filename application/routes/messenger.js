const router = require('express').Router();
require('../realtime_controller/messenger_socket');

_get_user_info =
    async (req) => req.user;

router.get('/messenger',
    async (req, res) =>
        res.render('messenger_section', {user: await _get_user_info(req)}),
);

exports.router = router;

