const express = require('express');
const UserController = require('../Controller/userController')
const router = express.Router();

router.post('/user',UserController.PostUser);
router.get('/user',UserController.GetUser);
router.put('/user/:userId', UserController.UpdateUser);
router.delete('/user/:userId', UserController.DeleteUserByID);
router.get('/user/:userId', UserController.GetUserByID);
router.get('/Searchuser', UserController.SearchUser);


module.exports = router;