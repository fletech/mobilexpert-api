const db = require("../../db/models");

const auxiliarController = {
  async getStorages(req, res, next) {
    const DATA = await db.Storage.findAll({
      include: [
        {
          all: true,
        },
      ],
    });

    res.status(200).json(DATA);
  },
  async getOneStorage(req, res, next) {
    const DATA = await db.Storage.findOne({
      where: { storage_id: req.params.id },
      include: [
        {
          all: true,
        },
      ],
    });

    res.status(200).json(DATA);
  },
};

module.exports = auxiliarController;
