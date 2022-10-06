const MOBILE_MODEL = (mobile) => {
  return {
    id: mobile.mobile_id,
    name: mobile.mobile_name,
    size: mobile.mobile_size,
    weight: mobile.mobile_weight,
    specs: mobile.mobile_specs,
    description: mobile.mobile_description,
    images: mobile.mobile_images,
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

const TABLET_MODEL = (tablet) => {
  return {
    id: tablet.tablet_id,
    name: tablet.tablet_name,
    size: tablet.tablet_size,
    weight: tablet.tablet_weight,
    specs: tablet.tablet_specs,
    description: tablet.tablet_description,
    brand: {
      brand_id: tablet.brand.brand_id,
      brand_name: tablet.brand.brand_name,
    },
    colors: tablet.colors.map((color) => ({
      color_id: color.color_id,
      color_name: color.color_name,
    })),
    storages: tablet.storages.map((storage) => ({
      storage_id: storage.storage_id,
      storage_amount: storage.storage_amount,
      storage_unity: storage.storage_unity,
      tablet_storage_relation_id: storage.tablet_storage.relation_id,
    })),
    status: tablet.status,
    createdAt: tablet.createdAt,
    updatedAt: tablet.updatedAt,
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
    other_info: subscription.otherInfo,
    status: subscription.subscription_status,
    createdAt: subscription.createdAt,
    updatedAt: subscription.updatedAt,
  };
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

const INSTALLMENTS_MODELER_ARRAY = (installments, type) => {
  let installment_ids = [];
  let financiation = installments.map((installment) => {
    //chequear el tipo de hardware que es para pasar al objeto un value mas limpio
    installment_ids.push(installment.installment_id);
    return {
      installment_id: installment.installment_id,
      installment_quantity: installment.installment_quantity,
      installment_price:
        type == "mobile"
          ? installment.mobile_price_installment.installment_price
          : type == "tablet"
          ? installment.tablet_price_installment.installment_price
          : 0,
    };
  });

  return { financiation, installment_ids };
};

const mobile_relations = (object, type) => {
  let response = {
    mobile_storage: `${object.storage_amount}${object.storage_unity}`,
    storage_id: object.storage_id,
    company_name: object.company_name,
    company_id: object.company_id,
  };

  return response;
};

const MOBILE_SUBSCRIPTION_MODEL = (object, cb) => {
  const { mobile_storage, storage_id, company_name, company_id } = cb;
  return {
    mobile_price_subscription_id: object.mobile_price_subscription_id,
    company_name: company_name,
    mobile_name: object.mobile.mobile_name,
    mobile_storage_amount: mobile_storage,
    mobile_price_cash_only: object.mobile_price_cash_only,
    mobile_price_cash_plan: object.mobile_price_cash_plan,
    mobile_price_name: object.mobile_price_name,
    mobile_price_campaign: object.mobile_price_campaign,
    mobile_price_currency: object.subscription.subscription_currency,
    subscription_name: object.subscription.subscription_name,
    subscription_monthly_price: object.subscription.subscription_monthly_price,
    status: object.status,
    mobile_price_installments: INSTALLMENTS_MODELER_ARRAY(
      object.installments,
      "mobile"
    ).financiation,
    subscription_details: [
      {
        subscription_data_amount: object.subscription.subscription_data_amount,
        subscription_data_unity: object.subscription.subscription_data_unity,
        subscription_minutes: object.subscription.subscription_minutes,
        subscription_sms: object.subscription.subscription_sms,
        subscription_network_5G: object.subscription.subscription_5G,
        subscription_roaming: object.subscription.subscription_roaming,
        subscription_people: object.subscription.subscription_people,
        subscription_services: object.subscription.services,
        subscription_minimum_price:
          object.subscription.subscription_minimum_monthly_price,
        subscription_price_per_person:
          object.subscription.subscription_price_per_person,
      },
    ],
    ids: {
      company_id: company_id,
      mobile_id: object.mobile.mobile_id,
      storage_id: storage_id,
      mobile_storage_relation_id: object.mobile_storage.relation_id,
      subscription_id: object.subscription.subscription_id,
    },
  };
};

const tablet_relations = (object, type) => {
  let response = {};
  response = {
    tablet_storage: `${object.storage_amount}${object.storage_unity}`,
    tablet_storage_id: object.storage_id,
    company_name: object.company_name,
    company_id: object.company_id,
  };

  return response;
};

const TABLET_SUBSCRIPTION_MODEL = (object, cb) => {
  const { tablet_storage, tablet_storage_id, company_name, company_id } = cb;

  return {
    tablet_price_subscription_id: object.tablet_price_subscription_id,
    company_name: company_name,
    tablet_name: object.tablet.tablet_name,
    tablet_storage_amount: tablet_storage,
    tablet_price_cash_only: object.tablet_price_cash_only,
    tablet_price_cash_plan: object.tablet_price_cash_plan,
    tablet_price_name: object.tablet_price_name,
    tablet_price_campaign: object.tablet_price_campaign,
    tablet_price_currency: object.subscription.subscription_currency,
    subscription_name: object.subscription.subscription_name,
    subscription_monthly_price: object.subscription.subscription_monthly_price,
    tablet_price_installments: INSTALLMENTS_MODELER_ARRAY(
      object.installments,
      "tablet"
    ).financiation,
    subscription_details: [
      {
        subscription_data_amount: object.subscription.subscription_data_amount,
        subscription_data_unity: object.subscription.subscription_data_unity,
        subscription_minutes: object.subscription.subscription_minutes,
        subscription_sms: object.subscription.subscription_sms,
        subscription_network_5G: object.subscription.subscription_5G,
        subscription_roaming: object.subscription.subscription_roaming,
        subscription_people: object.subscription.subscription_people,
        subscription_services: object.subscription.services,
        subscription_minimum_price:
          object.subscription.subscription_minimum_monthly_price,
        subscription_price_per_person:
          object.subscription.subscription_price_per_person,
      },
    ],
    ids: {
      company_id: company_id,
      tablet_id: object.tablet.tablet_id,
      tablet_storage_id: tablet_storage_id,
      subscription_id: object.subscription.subscription_id,
    },
  };
};

module.exports = {
  MOBILE_MODEL,
  TABLET_MODEL,
  SUBSCRIPTION_MODEL,
  MOBILE_SUBSCRIPTION_MODEL,
  TABLET_SUBSCRIPTION_MODEL,
  mobile_relations,
  tablet_relations,
};
