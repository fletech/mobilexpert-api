module.exports = {
  development: {
    logging: false,
    logQueryParameters: false,
    username: "root",
    password: "root",
    database: "mobilexpert",
    host: "127.0.0.1",
    dialect: "mysql",
    port: 8889,
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
    port: 8889,
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
