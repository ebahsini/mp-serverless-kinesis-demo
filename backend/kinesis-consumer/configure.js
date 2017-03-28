"use strict";

// handler configuration
const config = {};
config.REDIS_HOST = process.env.REDIS_HOST;
config.REDIS_PORT = process.env.REDIS_PORT;
config.REGION = process.env.REGION;
config.STAGE = process.env.STAGE;

// aws configuration
const AWS = require("aws-sdk");
AWS.config.update({
  region: config.REGION
});
var Redis = require('ioredis');
var redis = null;

// keyword options
const coldKeywords = ["doge-memes", "mild-stuffs", "robot-matchmaking"];
const hotKeywords = ["horrible-materials", "bad-stuffs", "4chan.com"];
var configHot = false;

// main event handler
module.exports.configure = (event, context, callback) => {

  // setup redis connection
  redis = new Redis(config.REDIS_PORT, config.REDIS_HOST);


// CONFIG GOES HERE!!!






  // please rewind
  redis.quit()
};
