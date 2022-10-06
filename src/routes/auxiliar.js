const express = require("express");
const router = express.Router();
const auxiliarController = require("../controllers/auxiliarController.js");

//GET
router.get("/brands", auxiliarController.getBrands);
router.get("/colors", auxiliarController.getColors);
router.get("/companies", auxiliarController.getCompanies);
router.get("/installments", auxiliarController.getInstallments);
router.get("/services", auxiliarController.getServices);
router.get("/storages", auxiliarController.getStorages);
router.get("/storages/:id", auxiliarController.getOneStorage);
router.get("/subscription-specs", auxiliarController.getSubscriptionSpecs);
router.get("/subscription-types", auxiliarController.getSubscriptionType);
//POST
router.post("/brands", auxiliarController.postBrands);
router.post("/colors", auxiliarController.postColors);
router.post("/companies", auxiliarController.postCompanies);
router.post("/services", auxiliarController.postServices);
router.post("/storages", auxiliarController.postStorages);
router.post("/subscription-specs", auxiliarController.postSubscriptionSpecs);
router.post("/subscription-types", auxiliarController.postSubscriptionType);

module.exports = router;
