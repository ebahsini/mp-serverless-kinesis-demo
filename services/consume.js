"use strict";



// ADD YOUR ERROR HANDLING NOTES!!!
// serverless invoke local --function consumeKinesis --stage local






// handler configuration
const config = {};
config.EMAIL_ALERT = process.env.EMAIL_ALERT;
config.EMAIL_SOURCE = process.env.EMAIL_SOURCE;
config.REDIS_HOST = process.env.REDIS_HOST;
config.REDIS_PORT = process.env.REDIS_PORT;
config.REGION = process.env.REGION;
config.STAGE = process.env.STAGE;

// aws configuration
const AWS = require("aws-sdk");
AWS.config.update({
  region: config.REGION
});
var ses = new AWS.SES();
var Redis = require('ioredis');
var redis = null;


// main event handler
module.exports.consumeStream = (event, context, callback) => {
  //console.log(JSON.stringify(event, null, 4));
  // demo state - pass via parameter, not actual global
  var DS = {};
  DS.callback = callback;
  DS.config = config;
  DS.events = [];

  // setup redis connection
  redis = new Redis(config.REDIS_PORT, config.REDIS_HOST);

  // process stream data
  parseKinesis(event.Records, DS);

  // testing artifacts
  //console.log(DS.events);
  //IGS.events = DS.events.slice(0, 1);
  console.log("event-zero ::", DS.events[0]);
  console.log("event-count ::", DS.events.length);

  // leave happy
  getOut();
};


// helpers
function parseKinesis(records, ledger) {
  // obtain url-events from records
  var event;
  var events = [];
  records.map((record) => {
    // parse kinesis data
    var buffer = new Buffer(record.kinesis.data, "base64");
    var payload = JSON.parse(buffer.toString("utf8"));
    //console.log(payload);
    payload.logs.map((log) => {
      event = {};
      // denormalize payload data
      event.device_id = payload.device_id;
      event.time_publish = payload.time;
      event.metadata = payload.meta_data;
      // create event for each log action
      var items = log.split("|");
      event.time = items[0];
      event.url = items[1];
      event.action = items[2];
      // update collection
      console.log(event);
      events.push(event);
    });
  });
  ledger.events = events;
}

function sendAlertEmail(alert, ledger) {
  var message;
  var params;
  message =
    "Your users have encountered something interesting: " + "test url" + "\n\n" +
    "This event occured at: " + "test time" + "\n\n" +
    "User action: " + "test action" + "\n";
  params = {
    Destination: {
      BccAddresses: [ null ],
      CcAddresses: [ null ],
      ToAddresses: [ 'evan@epxlabs.com' ]
    },
    Message: {
      Body: {
        Text: {
          Data: message,
        }
      },
      Subject: {
        Data: 'ALERT: Example Data Found!!1!1one',
      }
    },
    Source: 'alertsdemo@mobileposse.com',
  };
  ses.sendEmail(params, function(err, data) {
    if (err) console.log(err, err.stack);
    console.log("ses.sendEmail :: ", data);
  });
}

function getOut(ledger) {
  // get done
 redis.quit();
}
