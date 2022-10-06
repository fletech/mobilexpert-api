const express = require("express");
const router = express.Router();
const searchController = require("../controllers/searchController.js");

/* GET home page. */
router.get("/", searchController.getAllSearchs);
router.post("/create", searchController.postSearch);

module.exports = router;
