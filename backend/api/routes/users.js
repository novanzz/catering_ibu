const express = require('express');
const router = express.Router();

const UserControllers = require('../controllers/users');

router.post('/signup', UserControllers.user_post_signup);
router.post('/login', UserControllers.user_post_login);

module.exports = router;