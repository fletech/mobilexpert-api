const { sequelize } = require("../../db/models");
const db = require("../../db/models");
const { flattenObject } = require("../../lib/flattenObject");
const toPlain = require("../../lib/toPlain");

const searchController = {
  async getAllSearchs(req, res, next) {
    const DATA = await db.Search.findAll({
      include: [{ all: true }],
    });

    const SEARCHS = toPlain(DATA);
    SEARCHS.map((search) => {
      search.search_content = JSON.parse(search.search_content);
    });

    res.status(200).json({
      count: SEARCHS.length,
      data: SEARCHS,
    });
  },
  async postSearch(req, res, next) {
    const TYPE = req.body.search.type;
    const BODY_SEARCH = req.body.search.body;
    const BODY_USER = req.body.user;
    console.log("BODY_SEARCH");
    console.log(BODY_SEARCH);
    console.log("BODY_USER");
    console.log(BODY_USER);
    let body_content = {
      hardware: {
        user_id: BODY_USER.id,
        user_name: BODY_USER.name,
        user_email: BODY_USER.user_email,
        search_content: BODY_SEARCH,
      },
      subscription: {
        user_id: BODY_USER.id,
        user_name: BODY_USER.name,
        user_email: BODY_USER.user_email,
        search_content: BODY_SEARCH,
      },
    };

    const CONTENT =
      TYPE == "hardware" ? body_content.hardware : body_content.subscription;
    try {
      const SEARCH = await db.Search.create(CONTENT);
      res.status(201).json({ response: SEARCH });
    } catch {
      (err) => console.log(err);
    }
  },
};

module.exports = searchController;
