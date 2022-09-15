const express = require("express");
const router = express.Router();
const hardwareController = require("../controllers/hardwareController.js");

router.get("/all-mobiles", hardwareController.getAllMobiles);
router.get(
  "/all-mobile-subscription",
  hardwareController.getAllMobileSubscription
);

module.exports = router;
