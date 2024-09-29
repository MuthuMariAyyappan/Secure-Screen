const  express = require('express');
const router = express.Router();
const controller = require("../controllers/UserController.js")
const {verifyToken} = require('../services/JwtToken')
require('dotenv').config()

//Defining Routers
router.post(`/user/register`,express.json(),controller.registerUser)

router.post("/user/login",express.json(),controller.login)

router.put(`/user/:id`,express.json(),verifyToken,controller.updateUser)

router.get(`/user/:id`,express.json(),verifyToken,controller.getUserById)

router.get(`/user`,express.json(),verifyToken,controller.getAllUsers)

router.delete(`/user/:id`,express.json(),verifyToken,controller.deleteUserById)

module.exports = router;
