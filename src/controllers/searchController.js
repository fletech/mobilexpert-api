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
    const TYPE = req.body.type;
    const BODY = req.body.body;
    let body_content = {
      hardware: {
        user_id: BODY.user.id,
        user_name: BODY.user.name,
        user_email: BODY.user.user_email,
        search_content: BODY.search,
      },
      subscription: {
        user_id: BODY.user.id,
        user_name: BODY.user.name,
        user_email: BODY.user.user_email,
        search_content: BODY.search,
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
