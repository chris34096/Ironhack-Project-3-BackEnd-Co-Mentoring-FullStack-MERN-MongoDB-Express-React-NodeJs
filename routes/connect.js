const express = require('express');
const connectController = require ('../controller/connect')
const router = express.Router();
const isAuth = require('../middleware/is-Auth')

router.post("/send",isAuth,connectController.sendRequest)
router.post("/accept",isAuth,connectController.acceptRequest)

module.exports = router

