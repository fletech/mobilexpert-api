const db = require("../../db/models");
const {
  MOBILE_MODEL,
  MOBILE_SUBSCRIPTION_MODEL,
  callToApi,
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
        const DATA_AUX = await db.Storage.findOne({
          where: { storage_id: mobile.mobile_storage.storage_id },
          include: [
            {
              all: true,
            },
          ],
        });
        const DATA_PLAIN = toPlain(DATA_AUX);

        return MOBILE_SUBSCRIPTION_MODEL(mobile, DATA_PLAIN);
      })
    ).then((values) => {
      res.status(200).json({
        count: values.length,
        data: values,
      });
    });

    // Promise.all(
    //   main_res.results.map((item) => {
    //     return axios.get(url);
    //   })
    // ).then((nuevo_arreglo) => {
    //   // el resultado será un arreglo nuevo con los resultados de cada Promesa (siempre que todas hayan sido resueltas)
    //   nuevo_arreglo.forEach((result) => {
    //     console.log(result.data); // el resultado está en la propiedad data del objeto devuelto
    //   });
    // });
    // await res.status(200).json({
    //   count: "response.length",
    //   data: "response",
    // });
  },
};

module.exports = hardwareController;

//DATA PLAIN
// {
//   storage_id: 2,
//   storage_amount: 128,
//   storage_unity: 'gb',
//   mobiles: [
//     {
//       mobile_id: 1,
//       mobile_name: 'iphone 13',
//       mobile_size: null,
//       mobile_weight: null,
//       mobile_specs: null,
//       mobile_description: null,
//       mobile_brand: 1,
//       status: true,
//       createdAt: 2022-09-06T08:43:36.000Z,
//       updatedAt: 2022-09-06T23:50:11.000Z,
//       mobile_storage: [Object]
//     }
//   ]
// }

//RESPONSE
// RESPONSE
// {
//   mobile_price_subscription_id: 1,
//   mobile_id: 1,
//   subscription_id: 1,
//   mobile_storage_id: 6,
//   mobile_price_cash_only: 4500,
//   mobile_price_cash_plan: 3500,
//   mobile_price_currency: 'DKK',
//   mobile_finance_6: 590,
//   mobile_finance_10: null,
//   mobile_finance_12: 400,
//   mobile_finance_18: 350,
//   mobile_finance_20: null,
//   mobile_finance_24: 270,
//   mobile_finance_30: null,
//   mobile_finance_36: 180,
//   mobile_finance_40: null,
//   mobile: {
//     mobile_id: 1,
//     mobile_name: 'iphone 13',
//     mobile_size: null,
//     mobile_weight: null,
//     mobile_specs: null,
//     mobile_description: null,
//     mobile_brand: 1,
//     status: true,
//     createdAt: 2022-09-06T08:43:36.000Z,
//     updatedAt: 2022-09-06T23:50:11.000Z
//   },
//   subscription: {
//     subscription_id: 1,
//     subscription_name: 'ONE',
//     subscription_people: '1',
//     subscription_minimum_monthly_price: 219,
//     subscription_monthly_price: 199,
//     subscription_price_per_person: true,
//     subscription_currency: 'DKK',
//     subscription_data_amount: 80,
//     subscription_data_unity: 'GB',
//     subscription_specs: 1,
//     subscription_minutes: '1000',
//     subscription_sms: '1000',
//     subscription_5G: true,
//     subscription_roaming: true,
//     subscription_other_info: null,
//     subscription_company: 1,
//     subscription_status: true,
//     createdAt: 2022-09-11T23:39:17.000Z,
//     updatedAt: 2022-09-11T23:39:17.000Z,
//     subscription_type: 1
//   },
//   mobile_storage: { relation_id: 6, mobile_id: 1, storage_id: 2 }
// }
