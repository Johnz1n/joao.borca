const request = require("request");
const MD5 = require("crypto-js/md5");

module.exports = (offset, limit, callback) => {
  let ts = new Date().getTime();
  let hash = MD5(
    ts + process.env.PRIVATE_KEY + process.env.PUBLIC_KEY
  ).toString();
  let pageOffset = offset != null ? offset : "0";
  let pageLimit = limit != null ? limit : "20";
  request(
    "https://gateway.marvel.com:443/v1/public/characters".concat(
      "?ts=" + ts,
      "&apikey=" + process.env.PUBLIC_KEY,
      "&hash=" + hash,
      "&offset=" + pageOffset,
      "&limit=" + pageLimit
    ),
    { json: true },
    (err, res, body) => {
      if (err || res.statusCode !== 200) {
        return callback(err || { statusCode: res.statusCode });
      }
      callback(null, body);
    }
  );
};
