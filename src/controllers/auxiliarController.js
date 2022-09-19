const db = require("../../db/models");

const auxiliarController = {
  //GET
  async getBrands(req, res, next) {
    const BRANDS = await db.Brand.findAll({});
    res.status(200).json(BRANDS);
  },
  async getColors(req, res, next) {
    const COLORS = await db.Color.findAll({});
    res.status(200).json(COLORS);
  },
  async getCompanies(req, res, next) {
    const COMPANIES = await db.Company.findAll({});
    res.status(200).json(COMPANIES);
  },
  async getServices(req, res, next) {
    const SERVICES = await db.Service.findAll({});
    res.status(200).json(SERVICES);
  },
  async getStorages(req, res, next) {
    const STORAGES = await db.Storage.findAll({});
    res.status(200).json(STORAGES);
  },
  async getOneStorage(req, res, next) {
    const STORAGE = await db.Storage.findOne({
      where: { storage_id: req.params.id },
      include: [
        {
          all: true,
        },
      ],
    });
    res.status(200).json(STORAGE);
  },
  async getSubscriptionSpecs(req, res, next) {
    const SPECS_SUBSCRIPTION = await db.SpecSubscription.findAll({});
    res.status(200).json(SPECS_SUBSCRIPTION);
  },
  async getSubscriptionType(req, res, next) {
    const TYPE_SUBSCRIPTION = await db.TypeSubscription.findAll({});
    res.status(200).json(TYPE_SUBSCRIPTION);
  },
  //POST
  async postBrands(req, res, next) {
    const BODY = req.body;
    const BRAND = await db.Brand.create({
      brand_name: BODY.brand_name,
      status: BODY.status,
    });
    res.status(201).json({ response: BRAND });
  },
  async postColors(req, res, next) {
    const BODY = req.body;
    try {
      const COLOR = await db.Color.create({
        color_name: BODY.color_name,
      });
      res.status(201).json({ response: COLOR });
    } catch {
      (err) => console.log(err);
    }
  },
  async postCompanies(req, res, next) {
    const BODY = req.body;
    try {
      const COMPANY = await db.Company.create({
        company_name: BODY.company_name,
      });
      res.status(201).json({ response: COMPANY });
    } catch {
      (err) => console.log(err);
    }
  },
  async postServices(req, res, next) {
    const BODY = req.body;

    try {
      const SERVICE = await db.Service.create({
        service_name: BODY.service_name,
        service_type: BODY.service_type,
        service_description: BODY.service_description,
      });
      res.status(201).json({ response: SERVICE });
    } catch {
      (err) => console.log(err);
    }
  },
  async postStorages(req, res, next) {
    const BODY = req.body;

    try {
      const STORAGE = await db.Storage.create({
        storage_amount: BODY.storage_amount,
        storage_unity: BODY.storage_unity,
      });
      res.status(201).json({ response: STORAGE });
    } catch {
      (err) => console.log(err);
    }
  },
  async postSubscriptionSpecs(req, res, next) {},
  async postSubscriptionType(req, res, next) {},
};

module.exports = auxiliarController;
