const { sequelize } = require("../../db/models");
const db = require("../../db/models");

const {
  TABLET_MODEL,
  TABLET_SUBSCRIPTION_MODEL,
  tablet_relations,
} = require("../../lib/DATA_MODEL");
const toPlain = require("../../lib/toPlain");

const hardwareController = {
  //GET
  async getAllTablets(req, res, next) {
    const DATA = await db.Tablet.findAll({
      include: [{ all: true }],
    });
    const TABLETS = toPlain(DATA);
    const RESPONSE = TABLETS.map((mobile) => TABLET_MODEL(mobile));
    res.status(200).json({
      count: RESPONSE.length,
      data: RESPONSE,
    });
  },
  async getAllTabletSubscription(req, res, next) {
    const DATA = await db.tablet_subscription.findAll({
      include: [{ all: true }],
    });

    const TABLETS = toPlain(DATA);

    const TABLET_SUBSCRIPTION = await Promise.all(
      TABLETS.map(async (tablet) => {
        const Data_storage = await db.Storage.findOne({
          where: { storage_id: tablet.tablet_storage.storage_id },
        });
        const Data_company = await db.Company.findOne({
          where: { company_id: tablet.subscription.subscription_company },
          include: [{ all: true }],
        });

        const DATA_PLAIN = {
          ...toPlain(Data_storage),
          ...toPlain(Data_company),
        };

        return TABLET_SUBSCRIPTION_MODEL(
          tablet,
          tablet_relations(DATA_PLAIN, ["storage", "company"])
        );
      })
    );

    res.status(200).json({
      count: TABLET_SUBSCRIPTION.length,
      data: TABLET_SUBSCRIPTION,
    });
  },
  //POST
  async postMobile(req, res, next) {
    const BODY = req.body;
    // BODY.mobile_colors = [1, 3];
    // BODY.mobile_storages = [2, 3];
    let transaction;
    try {
      transaction = await sequelize.transaction();

      const MOBILE = await db.Mobile.create(
        {
          mobile_name: BODY.mobile_name,
          mobile_size: BODY.mobile_size || null,
          mobile_weight: BODY.mobile_weight || null,
          mobile_specs: BODY.mobile_specs || null,
          mobile_description: BODY.mobile_description || null,
          mobile_brand: BODY.mobile_brand,
        },
        { transaction: transaction }
      );

      const MOBILE_COLORS = await Promise.all(
        BODY.mobile_colors.map(async (color_id) => {
          const MOBILE_COLOR = await db.mobile_color.create(
            {
              mobile_id: MOBILE.mobile_id,
              color_id: color_id,
            },
            { transaction: transaction }
          );
          return MOBILE_COLOR;
        })
      );

      const MOBILE_STORAGES = await Promise.all(
        BODY.mobile_storages.map(async (storage_id) => {
          const MOBILE_STORAGE = await db.mobile_storage.create(
            {
              mobile_id: MOBILE.mobile_id,
              storage_id: storage_id,
            },
            { transaction: transaction }
          );
          return MOBILE_STORAGE;
        })
      );

      await transaction.commit();
      res.status(201).json({
        response: {
          mobile: MOBILE,
          mobile_colors: MOBILE_COLORS,
          mobile_storages: MOBILE_STORAGES,
        },
      });
    } catch (error) {
      console.log(error);
      if (transaction) {
        await transaction.rollback();
      }
    }
  },
  async postMobileSubscription(req, res, next) {
    const BODY = req.body;

    try {
      const MOBILE_SUBSCRIPTION = await db.mobile_subscription.create(
        {
          mobile_id: BODY.mobile_id,
          subscription_id: BODY.subscription_id,
          mobile_storage_id: BODY.mobile_storage_id,
          mobile_price_cash_only: BODY.mobile_price_cash_only,
          mobile_price_cash_plan: BODY.mobile_price_cash_plan,
          mobile_price_currency: BODY.mobile_price_currency,
        },
        { isNewRecord: true }
      );
      res.status(201).json({
        response: MOBILE_SUBSCRIPTION,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = hardwareController;
