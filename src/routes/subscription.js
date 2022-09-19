const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController.js");

/* GET home page. */
router.get("/", subscriptionController.getAll);
router.post("/create", subscriptionController.postSubscription);

module.exports = router;
