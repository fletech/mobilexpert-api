const { sequelize } = require("../../db/models");
const db = require("../../db/models");

const { SUBSCRIPTION_MODEL } = require("../../lib/DATA_MODEL");
const toPlain = require("../../lib/toPlain");

const subscriptionController = {
  async getAll(req, res, next) {
    const DATA = await db.Subscription.findAll({
      include: [
        {
          all: true,
        },
      ],
    });

    const SUBSCRIPTIONS = toPlain(DATA);

    const RESPONSE = SUBSCRIPTIONS.map((subscription) =>
      SUBSCRIPTION_MODEL(subscription)
    );

    res.status(200).json({
      count: RESPONSE.length,
      data: RESPONSE,
    });
  },
  async postSubscription(req, res, next) {
    const BODY = req.body;

    let BODY_SERVICES = [BODY.service_1, BODY.service_2, BODY.service_3];
    let transaction;
    try {
      transaction = await sequelize.transaction();

      const SUBSCRIPTION = await db.Subscription.create(
        {
          subscription_name: BODY.subscription_name,
          subscription_people: BODY.subscription_people,
          subscription_type: BODY.subscription_type,
          subscription_minimum_monthly_price:
            BODY.subscription_minimum_monthly_price,
          subscription_monthly_price: BODY.subscription_monthly_price,
          subscription_price_per_person: BODY.subscription_price_per_person,
          subscription_currency: BODY.subscription_currency,
          subscription_data_amount: BODY.subscription_data_amount,
          subscription_data_unity: BODY.subscription_data_unity,
          subscription_minutes: BODY.subscription_minutes,
          subscription_5G: BODY.subscription_5G,
          subscription_roaming: BODY.subscription_roaming,
          // subscription_other_info: BODY.subscription_other_info,
          // subscription_binding: BODY.subscription_binding,
          subscription_company: BODY.subscription_company,
          subscription_sms: BODY.subscription_sms,
          subscription_status: BODY.subscription_status,
        },
        { transaction: transaction }
      );
      SUBSCRIPTION.subscription_specs = SUBSCRIPTION.subscription_id;

      SUBSCRIPTION.save();

      const SPEC_SUBSCRIPTION = await db.SpecSubscription.create(
        {
          subscription_id: SUBSCRIPTION.subscription_id,
          spec_name: "Testing",
          spec_type: "Testing",
          spec_info: "12 months",
        },
        { transaction: transaction }
      );

      const SERVICES = await Promise.all(
        BODY_SERVICES.map(async (service_id) => {
          const SUBSCRIPTION_SERVICE = await db.SubscriptionService.create(
            {
              subscription_id: SUBSCRIPTION.subscription_id,
              service_id: service_id,
            },
            { transaction: transaction }
          );
          return SUBSCRIPTION_SERVICE;
        })
      );

      await transaction.commit();

      res.status(201).json({
        response: {
          subscription: SUBSCRIPTION,
          specs: SPEC_SUBSCRIPTION,
          services: SERVICES,
        },
      });
    } catch {
      (err) => console.log(err);
      if (transaction) {
        await transaction.rollback;
      }
    }
  },
};

module.exports = subscriptionController;
