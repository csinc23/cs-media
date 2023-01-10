const { join } = require("path");
const env = require("dotenv");
env.config({ path: join(__dirname, "../..", ".env") });

module.exports = {
  url: process.env.MONGO_URL,
  database: "media",
  imgBucket: "photos",
};
