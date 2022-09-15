const axios = require("axios");
const toPlain = require("./toPlain");

const callToApi = async (url, object) => {
  try {
    const DATA = await axios.get(url);
    //     const DATA_PLAIN = toPlain(DATA);
    console.log(DATA);
    return DATA;
  } catch (error) {
    console.log(error);
  }
};

const MOBILE_MODEL = (mobile) => {
  return {
    id: mobile.mobile_id,
    name: mobile.mobile_name,
    size: mobile.mobile_size,
    weight: mobile.mobile_weight,
    specs: mobile.mobile_specs,
    description: mobile.mobile_description,
    brand: {
      brand_id: mobile.brand.brand_id,
      brand_name: mobile.brand.brand_name,
    },
    colors: mobile.colors.map((color) => ({
      color_id: color.color_id,
      color_name: color.color_name,
    })),
    storages: mobile.storages.map((storage) => ({
      storage_id: storage.storage_id,
      storage_amount: storage.storage_amount,
      storage_unity: storage.storage_unity,
      mobile_storage_relation_id: storage.mobile_storage.relation_id,
    })),
    status: mobile.status,
    createdAt: mobile.createdAt,
    updatedAt: mobile.updatedAt,
  };
};

const SUBSCRIPTION_MODEL = (subscription) => {
  return {
    id: subscription.subscription_id,
    company_id: subscription.company.company_id,
    company_name: subscription.company.company_name,
    type_id: subscription.type.type_id,
    type_name: subscription.type.type_name,
    name: subscription.subscription_name,
    people: subscription.subscription_people,
    minimum_monthly_price: subscription.minimum_monthly_price,
    monthly_price: subscription.subscription_monthly_price,
    price_per_person: subscription.subscription_price_per_person,
    currency: subscription.subscription_currency,
    data_amount: subscription.subscription_data_amount,
    data_unity: subscription.subscription_data_unity,
    minutes: subscription.subscription_minutes,
    sms: subscription.subscription_sms,
    network_5G: subscription.subscription_5G,
    roaming: subscription.subscription_roaming,
    other_info: subscription.subscription_other_info,
    services: subscription.services.map((service) => ({
      service_id: service.service_id,
      service_name: service.service_name,
      service_type: service.service_type,
      service_specs: service.service_specs,
      service_other_info: service.service_other_info,
      service_description: service.service_description,
    })),
    specs: subscription.specs,
    binding: subscription.binding,
    status: subscription.subscription_status,
    createdAt: subscription.createdAt,
    updatedAt: subscription.updatedAt,
  };
};

const data = {
  mobile_price_subscription_id: 2,
  mobile_id: 3,
  subscription_id: 2,
  mobile_storage_id: 9,
  mobile_price_cash_only: 4000,
  mobile_price_cash_plan: 3000,
  mobile_price_currency: "DKK",
  mobile_finance_6: 550,
  mobile_finance_10: null,
  mobile_finance_12: 380,
  mobile_finance_18: 340,
  mobile_finance_20: null,
  mobile_finance_24: 260,
  mobile_finance_30: null,
  mobile_finance_36: 260,
  mobile_finance_40: null,
  mobile: {
    mobile_id: 3,
    mobile_name: "z10",
    mobile_size: null,
    mobile_weight: null,
    mobile_specs: null,
    mobile_description: null,
    mobile_brand: 2,
    status: true,
    createdAt: "2022-09-07T00:06:38.000Z",
    updatedAt: "2022-09-07T00:06:38.000Z",
  },
  subscription: {
    subscription_id: 2,
    subscription_name: "ONE NETFLIX",
    subscription_people: "2",
    subscription_minimum_monthly_price: 259,
    subscription_monthly_price: 239,
    subscription_price_per_person: true,
    subscription_currency: "DKK",
    subscription_data_amount: 100,
    subscription_data_unity: "GB",
    subscription_specs: 1,
    subscription_minutes: "1000",
    subscription_sms: "1000",
    subscription_5G: true,
    subscription_roaming: true,
    subscription_other_info: null,
    subscription_company: 1,
    subscription_status: true,
    createdAt: "2022-09-11T23:39:17.000Z",
    updatedAt: "2022-09-11T23:39:17.000Z",
    subscription_type: 1,
  },
  mobile_storage: {
    relation_id: 9,
    mobile_id: 3,
    storage_id: 5,
  },
};

const INSTALLMENTS_MODELER = (object) => {
  let financiation = {};
  Object.keys(object).map((key) => {
    if (key.includes("finance") && object[key] != null) {
      financiation[key] = object[key];
    }
  });
  return financiation;
};

const MOBILE_SUBSCRIPTION_MODEL = async (object, cb) => {
  const { mobile_storage, mobile_storage_id } = cb;
  // console.log("DATA_PLAIN");
  // console.log(cb);
  // console.log("RESPONSE");
  // console.log(object);

  return {
    mobile_price_subscription_id: 2,
    mobile_id: object.mobile.mobile_id,
    mobile_name: object.mobile.mobile_name,
    //     mobile_storage: mobile_storage,
    //     mobile_storage_id: mobile_storage_id,
    mobile_price_cash_only: object.mobile_price_cash_only,
    mobile_price_cash_plan: object.mobile_price_cash_plan,
    mobile_price_currency: object.subscription.subscription_currency,
    subscription_id: object.subscription.subscription_id,
    subscription_name: object.subscription.subscription_name,
    subscription_people: object.subscription.subscription_people,
    subscription_minimum_price:
      object.subscription.subscription_minimum_monthly_price,
    subscription_monthly_price: object.subscription.subscription_monthly_price,
    subscription_price_per_person:
      object.subscription.subscription_price_per_person,
    subscription_data_amount: object.subscription.subscription_data_amount,
    subscription_data_unity: object.subscription.subscription_data_unity,
    subscription_minutes: object.subscription.subscription_minutes,
    subscription_sms: object.subscription.subscription_sms,
    subscription_network_5G: object.subscription.subscription_5G,
    subscription_roaming: object.subscription.subscription_roaming,
    //     subscription_company: object.subscription,
    mobile_price_installments: INSTALLMENTS_MODELER(object),

    mobile: {
      mobile_size: null,
      mobile_weight: null,
      mobile_specs: null,
      mobile_description: null,
      mobile_brand: 2,
      status: true,
      createdAt: "2022-09-07T00:06:38.000Z",
      updatedAt: "2022-09-07T00:06:38.000Z",
    },
    subscription: {
      subscription_minimum_monthly_price: 259,
      subscription_monthly_price: 239,
      subscription_price_per_person: true,
      subscription_data_amount: 100,
      subscription_data_unity: "GB",
      subscription_specs: 1,
      subscription_minutes: "1000",
      subscription_sms: "1000",
      subscription_5G: true,
      subscription_roaming: true,
      subscription_other_info: null,
      subscription_company: 1,
      subscription_status: true,
      createdAt: "2022-09-11T23:39:17.000Z",
      updatedAt: "2022-09-11T23:39:17.000Z",
      subscription_type: 1,
    },
    mobile_storage: {
      relation_id: 9,
      mobile_id: 3,
      storage_id: 5,
    },
  };
};

module.exports = {
  MOBILE_MODEL,
  SUBSCRIPTION_MODEL,
  MOBILE_SUBSCRIPTION_MODEL,
  callToApi,
};
