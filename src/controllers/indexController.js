const routes = {
  get: [
    "/api/aux/brands",
    "/api/aux/colors",
    "/api/aux/companies",
    "/api/aux/services",
    "/api/aux/storages",
    "/api/aux/storages/:id",
    "/api/aux/subscription-specs",
    "/api/aux/subscription-types",
    "/api/hardware/all-mobiles",
    "/api/hardware/all-tablets",
    "/api/hardware/all-routers",
    "/api/hardware/all-mobile-subscription",
    "/api/subscriptions",
  ],
  post: [
    "/api/aux/brands",
    "/api/aux/colors",
    "/api/aux/companies",
    "/api/aux/services",
    "/api/aux/storages",
    "/api/aux/storages/:id",
    "/api/hardware/mobile/create",
    "/api/hardware/router/create",
    "/api/hardware/tablet/create",
    "/api/hardware/mobile-subscription/create",
    "/api/subscriptions/create",
  ],
  put: [""],
};
const indexController = {
  get(req, res, next) {
    res.render("index", {
      title: "Mobil Expert Server",
      subtitle: "Search Engine API",
      routes,
    });
  },
};

module.exports = indexController;
