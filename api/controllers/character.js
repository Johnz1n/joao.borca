const getCharacter = require("../service/marvel");
const queue = require("../queue/queue");
const Comic = require("../models/comic");

module.exports = () => {
  const controller = {};

  controller.listCharacters = (req, res) => {
    getCharacter(req.query.offset, req.query.limit, function (err, body) {
      if (err) {
        res.status(400).json(err);
      } else {
        body.data.results.map((char) => {
          queue.sendToQueue("Avengers", char);
        });
        res.status(200).json(body);
      }
    });
  };

  controller.getComicResourceURI = (req, res) => {
    console.log(req.params.resourceURI);
    const regex = new RegExp("/"+req.params.resourceURI+"$");
    Comic.findOne({ resourceURI: { $regex: regex } }, function (err, comic) {
      if (err) {
        res.status(400).json(err);
      } else if (comic == null) {
        res.status(400).json({ error: "Not Found" });
      } else {
        res.status(200).json(comic);
      }
    });
  };

  return controller;
};
