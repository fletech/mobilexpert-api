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
};

module.exports = subscriptionController;
