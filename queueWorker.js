const mongodb = require("./api/database/database");
const Character = require("./api/models/character");
const ComicItems = require("./api/models/comic");
const mongoose = require("mongoose");

const consume = () => {
  console.log("worker started");
  mongodb();
  const queue = require("./api/queue/queue");
  queue.consume("Avengers", (message) => {
    const content = message.content.toString();
    const { id, name, thumbnail, modified, comics } = JSON.parse(content);
    console.log("processing " + name);
    const char = new Character({
      _id: new mongoose.Types.ObjectId(id),
      name: name,
      thumbnail: thumbnail,
      modified: modified,
      comics: {
        available: comics.available,
        collectionURI: comics.collectionURI,
      }
    });
    char.save((err) => {
      if (err) console.log(err);

      console.log("character save in mongoDB: " + char.name);

      comics.items.forEach((element) => {
        const { resourceURI, name } = element;
        const comic = new ComicItems({
          resourceURI: resourceURI,
          name: name,
          character: char._id,
        });
        comic.save((err) => {
          if (err) console.log(err);
        });
        console.log("comicItemns save in mongoDB: " + comic.name);
      });
    });
  });
};

consume();
