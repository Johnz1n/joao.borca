const app = require("./config/express")();

const serverless = require("serverless-http");

module.exports.run = serverless(app);
