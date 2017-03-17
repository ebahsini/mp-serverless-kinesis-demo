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
var sampleList = require(

// main event handler
module.exports.fillStream = (event, context, callback) => {
  console.log("yay!");
  // setup kinesis connection
  kinesis = new AWS.Kinesis();

}

function updateStream(ledger, counter) {
  params = {
    Data: data,
    PartitionKey: key,
    StreamName: ledger.config.STREAM,
    SequenceNumberForOrdering: (new Date).getTime().toString()
  };
  kinesis.putRecord(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      ledger.stats["updateStream"].stream_errors += 1;
      updateStream(ledger, next);
      return;
    }
    console.log("kinesis.putRecord :: ", data);
    ledger.stats["updateStream"].sent_records += 1;
    updateStream(ledger, next);
  });
}
