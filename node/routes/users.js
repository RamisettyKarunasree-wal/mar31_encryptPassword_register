var express = require('express');
var router = express.Router();
const userController = require('../controllers/users');
router.post('/', userController.createUser);
router.get('/', userController.getUsers);
// router.get('/login', userController.loginUser);
router.get('/checkUser/:username', userController.checkUser);
router.get('/checkEmail/:email', userController.checkEmail);
module.exports = router;
