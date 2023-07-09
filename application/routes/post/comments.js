const router = require('express').Router();
const controller = require('../../controllers/post/comments_controller');

router.get('/comment-post/:post_id', controller.get_comments_post);
router.post('/comment-post/', controller.add_comment_post);

router.get('/comment-comment/:comment_id', controller.get_comments_comment);
router.post('/comment-comment/', controller.add_comment_comment);

router.delete('/comment/:comment_id', controller.delete_comment);
router.post('/comment/', controller.update_comment);

exports.router = router;
