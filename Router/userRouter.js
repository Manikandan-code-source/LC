const express = require('express');
const UserController = require('../Controller/userController')
const router = express.Router();

// Login and Signup User Apis
router.post('/signup',UserController.RegisterUser);
router.post('/login',UserController.LoginUser);

// Get user Apis
router.get('/user',UserController.GetUser);
router.put('/user/:userId', UserController.UpdateUser);
router.delete('/user/:userId', UserController.DeleteUserByID);
router.get('/user/:userId', UserController.GetUserByID);
router.get('/Searchuser', UserController.SearchUser);


module.exports = router;