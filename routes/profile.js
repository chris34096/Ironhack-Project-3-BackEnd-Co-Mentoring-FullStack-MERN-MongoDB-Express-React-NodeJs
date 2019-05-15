const express = require("express");
const router = express.Router();
const profileController = require("../controller/profile");
const isAuth = require('../middleware/is-Auth');

router.post("/submit",isAuth,profileController.submitProfile,profileController.submitCompetence)
router.get("/getProfile",isAuth,profileController.getProfile)

// ,profileController.submitCompetence
module.exports = router;