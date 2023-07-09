const router = require('express').Router();

_get_user_info =
    async (req) => req.user;

router.get('/posts',
    async (req, res) =>
        res.render('posts_section', {user: await _get_user_info(req)}),
);

router.get('/reactions',
    async (req, res) =>
        res.render('reactions_section', {user: await _get_user_info(req)}),
);

router.get('/comments',
    async (req, res) =>
        res.render('comments_section', {user: await _get_user_info(req)}),
);

router.use(require('./post/reactions').router);
router.use(require('./post/comments').router);
router.use(require('./post/posts').router);

exports.router = router;
