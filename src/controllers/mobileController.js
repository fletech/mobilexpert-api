const { sequelize } = require("../../db/models");
const db = require("../../db/models");

const {
  MOBILE_MODEL,
  MOBILE_SUBSCRIPTION_MODEL,
  mobile_relations,
} = require("../../lib/DATA_MODEL");
const toPlain = require("../../lib/toPlain");

const hardwareController = {
  //////////////////////////////////////////GET
  async getAllMobiles(req, res, next) {
    const DATA = await db.Mobile.findAll({
      include: [{ all: true }],
    });
    const MOBILES = toPlain(DATA);
    const RESPONSE = MOBILES.map((mobile) => MOBILE_MODEL(mobile));
    res.status(200).json({
      count: RESPONSE.length,
      data: RESPONSE,
    });
  },
  async getAllMobileSubscription(req, res, next) {
    const DATA = await db.mobile_subscription.findAll({
      include: [{ all: true }],
    });

    const MOBILES = toPlain(DATA);

    const MOBILE_SUBSCRIPTION = await Promise.all(
      MOBILES.map(async (mobile) => {
        const Data_storage = await db.Storage.findOne({
          where: { storage_id: mobile.mobile_storage.storage_id },
        });
        const Data_company = await db.Company.findOne({
          where: { company_id: mobile.subscription.subscription_company },
          include: [{ all: true }],
        });

        const DATA_PLAIN = {
          ...toPlain(Data_storage),
          ...toPlain(Data_company),
        };

        return MOBILE_SUBSCRIPTION_MODEL(
          mobile,
          mobile_relations(DATA_PLAIN, ["storage", "company"])
        );
      })
    );

    res.status(200).json({
      count: MOBILE_SUBSCRIPTION.length,
      data: MOBILE_SUBSCRIPTION,
    });
  },
  //////////////////////////////////////////POST
  async postMobile(req, res, next) {
    const BODY = req.body;
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
    const INSTALLMENTS = JSON.parse(BODY.mobile_price_installments);

    let transaction;
    try {
      transaction = await sequelize.transaction();
      const MOBILE_SUBSCRIPTION = await db.mobile_subscription.create(
        {
          mobile_id: BODY.mobile_id,
          subscription_id: BODY.subscription_id,
          mobile_storage_id: BODY.mobile_storage_id,
          mobile_price_cash_only: BODY.mobile_price_cash_only,
          mobile_price_cash_plan: BODY.mobile_price_cash_plan,
          mobile_price_currency: BODY.mobile_price_currency,
          mobile_price_campaign: BODY.mobile_price_campaign || false,
          mobile_price_name: BODY.mobile_price_name,
        },
        { isNewRecord: true, transaction: transaction }
      );

      const MOBILE_SUBSCRIPTION_INSTALLMENTS = await Promise.all(
        INSTALLMENTS.map(async (installment) => {
          const MOBILE_PRICE_INSTALLMENT =
            await db.mobile_price_installment.create(
              {
                mobile_price_subscription_id:
                  MOBILE_SUBSCRIPTION.mobile_price_subscription_id,
                installment_id: installment.installment_id,
                installment_price: installment.installment_value,
              },
              { transaction: transaction }
            );
          return MOBILE_PRICE_INSTALLMENT;
        })
      );
      await transaction.commit();
      res.status(201).json({
        response: {
          mobile_subscription: MOBILE_SUBSCRIPTION,
          mobile_subscription_installments: MOBILE_SUBSCRIPTION_INSTALLMENTS,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = hardwareController;
