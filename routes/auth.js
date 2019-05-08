const express = require('express');
const authController = require ('../controller/auth')
const router = express.Router();
const isAuth = require('../middleware/is-Auth')



router.post('/login',authController.login)

router.post('/signup',authController.signup)

router.post('/logout')

router.get('/current',isAuth,(req,res) =>{
  res.json(req.user)
})

module.exports = router;