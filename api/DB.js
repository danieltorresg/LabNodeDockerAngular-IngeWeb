const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,
} = process.env;

var url = `mongodb://`;

if (MONGO_USERNAME) {
  url += `${MONGO_USERNAME}:${MONGO_PASSWORD}@`;
}
url += `${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

console.log(url)
module.exports = {
  DB: url,
};
