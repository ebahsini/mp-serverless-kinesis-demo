"use strict";

// handler configuration
const config = {};
config.API_KEY = process.env.API_KEY;
config.EMAIL_API_TO = process.env.EMAIL_API_TO;
config.EMAIL_SOURCE = process.env.EMAIL_SOURCE;
config.EMAIL_URL_TO = process.env.EMAIL_URL_TO;
config.REDIS_HOST = process.env.REDIS_HOST;
config.REDIS_PORT = process.env.REDIS_PORT;
config.REGION = process.env.REGION;
config.SNS_API_TOPIC = process.env.SNS_API_THROTTLE_TOPIC;
config.SNS_URL_TOPIC = process.env.SNS_ALERT_TOPIC;
config.STAGE = process.env.STAGE;
config.STREAM = process.env.STREAM;

// aws configuration
const AWS = require("aws-sdk");
AWS.config.update({
  region: config.REGION
});
var kinesis = null;

// some sample scaffolding
// var sampleList = require("./url-list.json")

const sampleList =
      { "urls":
        [
          "http://www.google.com/",
          "http://www.youtube.com/",
          "http://www.facebook.com/",
          "http://www.baidu.com/",
          "http://www.wikipedia.org/",
          "http://www.yahoo.com/",
          "http://www.google.co.in/"
        ]
      }

// main event handler
module.exports.fillStream = (event, context, callback) => {
  // setup kinesis connection
  kinesis = new AWS.Kinesis();
  var payload = JSON.stringify(sampleList);
  console.log(" Payload: " + payload);
  var params = {
    Data: payload,
    PartitionKey: "urls", /* required */
    StreamName: config.STREAM, /* required */
  };
  kinesis.putRecord(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });

}