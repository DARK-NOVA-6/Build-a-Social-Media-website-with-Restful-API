const router = require('express').Router();
const controller = require('../controllers/friendship_controller');

_get_user_info =
    async (req) => req.user;

router.get('/friendships',
    async (req, res) =>
        res.render('friendships_section', {user: await _get_user_info(req)}),
);

router.get('/friendship-request-receive', controller.get_received_requests);
router.get('/friendship-request-sent', controller.get_sent_requests);

router.post('/friendship-request/:user_id', controller.send_request);
router.delete('/friendship-request/:user_id', controller.deny_request);

router.get('/friendship-sug/:page_number', controller.get_suggested);
router.get('/friendship-common/:user_id', controller.get_common_friends);

router.get('/friendship', controller.get_friends);
router.post('/friendship/:user_id', controller.accept_request);
router.delete('/friendship/:user_id', controller.delete_friend);

exports.router = router;
