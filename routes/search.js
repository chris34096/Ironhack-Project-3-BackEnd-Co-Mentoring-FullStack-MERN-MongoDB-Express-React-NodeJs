const express = require("express");
const router = express.Router();
const searchController = require("../controller/search");
const isAuth = require('../middleware/is-Auth');

router.get("/users",isAuth,searchController.searchMentor);
router.get("/user",isAuth,searchController.profileMentor)


module.exports = router;