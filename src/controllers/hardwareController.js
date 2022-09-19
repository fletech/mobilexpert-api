const db = require("../../db/models");
const {
  MOBILE_MODEL,
  MOBILE_SUBSCRIPTION_MODEL,
  callToApi,
  cb_relations,
} = require("../../lib/DATA_MODEL");
const toPlain = require("../../lib/toPlain");

const hardwareController = {
  async getAllMobiles(req, res, next) {
    const DATA = await db.Mobile.findAll({
      include: [
        {
          all: true,
        },
      ],
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
      include: [
        {
          all: true,
        },
      ],
    });
    const MOBILES = toPlain(DATA);

    Promise.all(
      MOBILES.map(async (mobile) => {
        const Data_storage = await db.Storage.findOne({
          where: { storage_id: mobile.mobile_storage.storage_id },
          // include: [
          //   {
          //     all: true,
          //   },
          // ],
        });
        const Data_company = await db.Company.findOne({
          where: { company_id: mobile.subscription.subscription_company },
          include: [
            {
              all: true,
            },
          ],
        });
        const DATA_PLAIN = {
          ...toPlain(Data_storage),
          ...toPlain(Data_company),
        };

        return MOBILE_SUBSCRIPTION_MODEL(
          mobile,
          cb_relations(DATA_PLAIN, ["storage", "company"])
        );
      })
    ).then((values) => {
      res.status(200).json({
        count: values.length,
        data: values,
      });
    });
  },
};

module.exports = hardwareController;
