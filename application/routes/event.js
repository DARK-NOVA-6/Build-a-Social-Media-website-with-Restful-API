const router = require('express').Router();
const controller = require('../controllers/event_controller');

_get_user_info =
    async (req) => req.user;

router.get('/events',
    async (req, res) =>
        res.render('events_section', {user: await _get_user_info(req)}),
);

router.post('/add-event', controller.add);
router.post('/update-event', controller.update);

router.post('/join-event/:event_id', controller.join);
router.post('/undo-join-event/:event_id', controller.undo_join);

router.delete('/event/:event_id', controller.delete);
router.get('/event', controller.get_all);
router.get('/event-interested/:event_id', controller.get_interested);

exports.router = router;
