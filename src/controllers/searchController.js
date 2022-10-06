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
    const BODY = req.body;

    try {
      const SEARCH = await db.Search.create({
        user_id: BODY.user.id,
        user_name: BODY.user.name,
        user_email: BODY.user.user_email,
        search_content: BODY.search,
      });
      res.status(201).json({ response: SEARCH });
    } catch {
      (err) => console.log(err);
    }
  },
};

module.exports = searchController;
