module.exports = (app) => {
  const controller = require("../controllers/character")();

  app.get('/characters', controller.listCharacters);
  app.get('/comics/:resourceURI', controller.getComicResourceURI);
};
