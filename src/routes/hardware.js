const express = require("express");
const router = express.Router();
const tabletController = require("../controllers/tabletController.js");
const mobileController = require("../controllers/mobileController.js");

////////GET
//Mobile
router.get("/all-mobiles", mobileController.getAllMobiles);
router.get(
  "/all-mobile-subscription",
  mobileController.getAllMobileSubscription
);
//Tablet
router.get("/all-tablets", tabletController.getAllTablets);
router.get(
  "/all-tablet-subscription",
  tabletController.getAllTabletSubscription
);
////////POST
router.post("/mobile/create", mobileController.postMobile);
router.post(
  "/mobile-subscription/create",
  mobileController.postMobileSubscription
);
module.exports = router;
