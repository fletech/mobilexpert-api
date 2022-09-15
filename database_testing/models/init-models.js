var DataTypes = require("sequelize").DataTypes;
var _bindings = require("./bindings");
var _brands = require("./brands");
var _capacity = require("./capacity");
var _colors = require("./colors");
var _companies = require("./companies");
var _mobile_brand = require("./mobile_brand");
var _mobile_capacity = require("./mobile_capacity");
var _mobile_color = require("./mobile_color");
var _mobile_price_subscription = require("./mobile_price_subscription");
var _mobile_storage = require("./mobile_storage");
var _mobiles = require("./mobiles");
var _services = require("./services");
var _specs_subscription = require("./specs_subscription");
var _storages = require("./storages");
var _subscription_service = require("./subscription_service");
var _subscriptions = require("./subscriptions");
var _subscriptions_type = require("./subscriptions_type");

function initModels(sequelize) {
  var bindings = _bindings(sequelize, DataTypes);
  var brands = _brands(sequelize, DataTypes);
  var capacity = _capacity(sequelize, DataTypes);
  var colors = _colors(sequelize, DataTypes);
  var companies = _companies(sequelize, DataTypes);
  var mobile_brand = _mobile_brand(sequelize, DataTypes);
  var mobile_capacity = _mobile_capacity(sequelize, DataTypes);
  var mobile_color = _mobile_color(sequelize, DataTypes);
  var mobile_price_subscription = _mobile_price_subscription(sequelize, DataTypes);
  var mobile_storage = _mobile_storage(sequelize, DataTypes);
  var mobiles = _mobiles(sequelize, DataTypes);
  var services = _services(sequelize, DataTypes);
  var specs_subscription = _specs_subscription(sequelize, DataTypes);
  var storages = _storages(sequelize, DataTypes);
  var subscription_service = _subscription_service(sequelize, DataTypes);
  var subscriptions = _subscriptions(sequelize, DataTypes);
  var subscriptions_type = _subscriptions_type(sequelize, DataTypes);

  capacity.belongsToMany(mobiles, { as: 'mobile_id_mobiles_mobile_capacities', through: mobile_capacity, foreignKey: "capacity_id", otherKey: "mobile_id" });
  colors.belongsToMany(mobiles, { as: 'mobile_id_mobiles_mobile_colors', through: mobile_color, foreignKey: "color_id", otherKey: "mobile_id" });
  mobiles.belongsToMany(capacity, { as: 'capacity_id_capacities', through: mobile_capacity, foreignKey: "mobile_id", otherKey: "capacity_id" });
  mobiles.belongsToMany(colors, { as: 'color_id_colors', through: mobile_color, foreignKey: "mobile_id", otherKey: "color_id" });
  mobiles.belongsToMany(mobiles, { as: 'brand_id_mobiles', through: mobile_brand, foreignKey: "mobile_id", otherKey: "brand_id" });
  mobiles.belongsToMany(mobiles, { as: 'mobile_id_mobiles', through: mobile_brand, foreignKey: "brand_id", otherKey: "mobile_id" });
  services.belongsToMany(subscriptions, { as: 'subscription_id_subscriptions', through: subscription_service, foreignKey: "service_id", otherKey: "subscription_id" });
  subscriptions.belongsToMany(services, { as: 'service_id_services', through: subscription_service, foreignKey: "subscription_id", otherKey: "service_id" });
  mobiles.belongsTo(brands, { as: "mobile_brand_brand", foreignKey: "mobile_brand"});
  brands.hasMany(mobiles, { as: "mobiles", foreignKey: "mobile_brand"});
  mobile_capacity.belongsTo(capacity, { as: "capacity", foreignKey: "capacity_id"});
  capacity.hasMany(mobile_capacity, { as: "mobile_capacities", foreignKey: "capacity_id"});
  mobile_color.belongsTo(colors, { as: "color", foreignKey: "color_id"});
  colors.hasMany(mobile_color, { as: "mobile_colors", foreignKey: "color_id"});
  subscriptions.belongsTo(companies, { as: "subscription_company_company", foreignKey: "subscription_company"});
  companies.hasMany(subscriptions, { as: "subscriptions", foreignKey: "subscription_company"});
  mobile_price_subscription.belongsTo(mobile_storage, { as: "mobile_storage", foreignKey: "mobile_storage_id"});
  mobile_storage.hasMany(mobile_price_subscription, { as: "mobile_price_subscriptions", foreignKey: "mobile_storage_id"});
  mobile_brand.belongsTo(mobiles, { as: "mobile", foreignKey: "mobile_id"});
  mobiles.hasMany(mobile_brand, { as: "mobile_brands", foreignKey: "mobile_id"});
  mobile_brand.belongsTo(mobiles, { as: "brand", foreignKey: "brand_id"});
  mobiles.hasMany(mobile_brand, { as: "brand_mobile_brands", foreignKey: "brand_id"});
  mobile_capacity.belongsTo(mobiles, { as: "mobile", foreignKey: "mobile_id"});
  mobiles.hasMany(mobile_capacity, { as: "mobile_capacities", foreignKey: "mobile_id"});
  mobile_color.belongsTo(mobiles, { as: "mobile", foreignKey: "mobile_id"});
  mobiles.hasMany(mobile_color, { as: "mobile_colors", foreignKey: "mobile_id"});
  mobile_price_subscription.belongsTo(mobiles, { as: "mobile", foreignKey: "mobile_id"});
  mobiles.hasMany(mobile_price_subscription, { as: "mobile_price_subscriptions", foreignKey: "mobile_id"});
  mobile_storage.belongsTo(mobiles, { as: "mobile", foreignKey: "mobile_id"});
  mobiles.hasMany(mobile_storage, { as: "mobile_storages", foreignKey: "mobile_id"});
  subscription_service.belongsTo(services, { as: "service", foreignKey: "service_id"});
  services.hasMany(subscription_service, { as: "subscription_services", foreignKey: "service_id"});
  mobile_storage.belongsTo(storages, { as: "storage", foreignKey: "storage_id"});
  storages.hasMany(mobile_storage, { as: "mobile_storages", foreignKey: "storage_id"});
  bindings.belongsTo(subscriptions, { as: "subscription", foreignKey: "subscription_id"});
  subscriptions.hasOne(bindings, { as: "binding", foreignKey: "subscription_id"});
  mobile_price_subscription.belongsTo(subscriptions, { as: "subscription", foreignKey: "subscription_id"});
  subscriptions.hasMany(mobile_price_subscription, { as: "mobile_price_subscriptions", foreignKey: "subscription_id"});
  subscription_service.belongsTo(subscriptions, { as: "subscription", foreignKey: "subscription_id"});
  subscriptions.hasMany(subscription_service, { as: "subscription_services", foreignKey: "subscription_id"});
  subscriptions.belongsTo(subscriptions_type, { as: "subscription_type_subscriptions_type", foreignKey: "subscription_type"});
  subscriptions_type.hasMany(subscriptions, { as: "subscriptions", foreignKey: "subscription_type"});

  return {
    bindings,
    brands,
    capacity,
    colors,
    companies,
    mobile_brand,
    mobile_capacity,
    mobile_color,
    mobile_price_subscription,
    mobile_storage,
    mobiles,
    services,
    specs_subscription,
    storages,
    subscription_service,
    subscriptions,
    subscriptions_type,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
