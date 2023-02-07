const express = require('express');
const { UserController } = require('../controllers');
const { auth, guest } = require('../middlewares');

const router = express.Router();


router.post('/register', guest, UserController.register);
router.post('/login', guest, UserController.login);
router.put('/update/:id', auth, UserController.update_infos);
router.put('/update_password/:id', auth, UserController.update_password);

module.exports = router 