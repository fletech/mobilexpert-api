const express = require("express");
const router = express.Router();
const auxiliarController = require("../controllers/auxiliarController.js");

router.get("/storages", auxiliarController.getStorages);
router.get("/storages/:id", auxiliarController.getOneStorage);

module.exports = router;
