const express = require('express')
const router = express.Router();
const controller = require("../controllers/ChildController")
const {verifyToken} = require('../services/JwtToken')
require('dotenv').config()

router.post('/child/create-children',express.json(),verifyToken,controller.createChildren)

router.put(`/child/:id`,express.json(),verifyToken,controller.updateChild)

router.get(`/child/:id`,express.json(),verifyToken,controller.getChildById)

router.get(`/child`,express.json(),verifyToken,controller.getAllChildren)

router.delete(`/child/:id`,express.json(),verifyToken,controller.deleteChildById)

module.exports = router;