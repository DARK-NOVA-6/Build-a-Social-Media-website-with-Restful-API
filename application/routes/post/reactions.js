const router = require('express').Router();
const controller = require('../../controllers/post/reactions_controller');

router.post('/react-post/:post_id', controller.add_react_post);
router.delete('/react-post/:post_id', controller.remove_react_post);
router.get('/react-post/:post_id', controller.get_react_post);

router.post('/react-comment/:comment_id', controller.add_react_comment);
router.delete('/react-comment/:comment_id', controller.remove_react_comment);
router.get('/react-comment/:comment_id', controller.get_react_comment);

exports.router = router;

