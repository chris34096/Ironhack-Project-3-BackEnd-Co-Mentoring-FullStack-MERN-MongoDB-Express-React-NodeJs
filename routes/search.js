const express = require("express");
const router = express.Router();
const searchController = require("../controller/search");
const isAuth = require('../middleware/is-Auth');

router.get("/skill/:skill",isAuth,searchController.searchMentor);
router.get("/user/:user_id",isAuth,searchController.profileMentor)


module.exports = router;