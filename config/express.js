const express = require("express");
const bodyParser = require("body-parser");
const routes = require("../api/routes/routes");
const mongodb = require("../api/database/database");
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require("../swagger_output.json");

module.exports = () => {
  const app = express();

  app.set("port", process.env.PORT);
  app.use(bodyParser.json());

  app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  mongodb();

  routes(app);

  return app;
};
