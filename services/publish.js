"use strict";

// handler configuration
const config = {};
config.REGION = process.env.REGION;
config.STAGE = process.env.STAGE;
config.STREAM = process.env.STREAM;

// aws configuration
const AWS = require("aws-sdk");
AWS.config.update({
  region: config.REGION
});
var kinesis = null;

// test hack
const injectMatch = false;




// talk about purpose of producer here
// data is to be minimalistic-real
// but producer is not realistic, since we assume
// producers are different devices or servers




const robot_01 = {
  "device_id": "r2d2",
  "time": "put-time-here",
  "meta_data": "mork",
  "logs": [
    "1490563327|http://www.google.com/|1",
    "1490563329|http://www.youtube.com/|2",
    "1490563357|http://www.facebook.com/|1",
    "1490563397|http://www.yahoo.com/|4",
    "1490563527|http://www.twitter.com/|1",
    "1490563627|http://www.spotify.com/|3",
    "1490563827|http://www.aol.com/|1",
    "1490563927|http://www.4chan.com/|2"
  ]
}

const robot_02 = {
  "device_id": "c3p0",
  "time": "put-time-here",
  "meta_data": "mindy",
  "logs": [
    "1490563327|http://www.google.com/|1",
    "1490563329|http://www.youtube.com/|2",
    "1490563357|http://www.facebook.com/|1",
    "1490563397|http://www.yahoo.com/|4",
    "1490563527|http://www.twitter.com/|1",
    "1490563627|http://www.spotify.com/|3",
    "1490563827|http://www.aol.com/|1",
    "1490563927|http://www.4chan.com/|2"
  ]
}

const robot_03 = {
  "device_id": "astro-boy",
  "time": "put-time-here",
  "meta_data": "bubble-tea",
  "logs": [
    "1490563327|http://www.google.com/|1",
    "1490563329|http://www.youtube.com/|2",
    "1490563357|http://www.facebook.com/|1",
    "1490563397|http://www.yahoo.com/|4",
    "1490563527|http://www.twitter.com/|1",
    "1490563627|http://www.spotify.com/|3",
    "1490563827|http://www.aol.com/|1",
    "1490563927|http://www.4chan.com/|2"
  ]
}

const robot_04 = {
  "device_id": "bender",
  "time": "put-time-here",
  "meta_data": "cold-brew",
  "logs": [
    "1490563327|http://www.google.com/|1",
    "1490563329|http://www.youtube.com/|2",
    "1490563357|http://www.robot-matchmaking.com/|1",
    "1490563397|http://www.yahoo.com/|4",
    "1490563527|http://www.twitter.com/|1",
    "1490563627|http://www.spotify.com/|3",
    "1490563827|http://www.aol.com/|1",
    "1490563927|http://www.4chan.com/|2"
  ]
}

// example time from reel life
// Feb 13, 2017 11:03:18 PM




// main event handler
module.exports.publishStream = (event, context, callback) => {
  var payload;

  // setup kinesis connection
  kinesis = new AWS.Kinesis();

  // push payload-01
  payload = robot_01;
  var params = {
    Data: JSON.stringify(payload),
    PartitionKey: payload.device_id,
    StreamName: config.STREAM
  };
  kinesis.putRecord(params, function(err, data) {
    if (err) console.log(err, err.stack);
    console.log("kinesis-publish :: ", data);
  });

  // push payload-02
  payload = robot_02;
  var params = {
    Data: JSON.stringify(payload),
    PartitionKey: payload.device_id,
    StreamName: config.STREAM
  };
  kinesis.putRecord(params, function(err, data) {
    if (err) console.log(err, err.stack);
    console.log("kinesis-publish :: ", data);
  });

  // push payload-03
  payload = robot_03;
  var params = {
    Data: JSON.stringify(payload),
    PartitionKey: payload.device_id,
    StreamName: config.STREAM
  };
  kinesis.putRecord(params, function(err, data) {
    if (err) console.log(err, err.stack);
    console.log("kinesis-publish :: ", data);
  });

  if (injectMatch) {
    console.log("Test Mode :: Inject Matching Data");
    // push payload-04
    payload = robot_04;
    var params = {
      Data: JSON.stringify(payload),
      PartitionKey: payload.device_id,
      StreamName: config.STREAM
    };
    kinesis.putRecord(params, function(err, data) {
      if (err) console.log(err, err.stack);
      console.log("kinesis-publish :: ", data);
    });
  }
}
