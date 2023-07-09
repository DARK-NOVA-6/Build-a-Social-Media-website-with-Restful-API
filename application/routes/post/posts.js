const router = require('express').Router();
const controller = require('../../controllers/post/post_controller');
const multer = require('multer');
const upload = multer({dest: '/.temp/uploaded'});

router.post('/add-post',
    upload.single('photo'),
    controller.add_post);

router.post('/update-post',
    upload.single('photo'),
    controller.update_post);

router.post('/mark-seen/:post_id',
    controller.mark_seen);

router.get('/best-post/:sort_type',
    controller.get_next_post);

router.get('/best-post-user/:sort_type/:user_id',
    controller.get_next_post_user);

router.delete('/post/:post_id',
    controller.delete_post);

exports.router = router;

