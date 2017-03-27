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


// main event handler
module.exports.consumeKinesis = (event, context, callback) => {
  //console.log(JSON.stringify(event, null, 4));
  // manual hoisting
  var IGS = {};
  IGS.config = config;
  IGS.events = [];

  // setup redis connection
  // add reconnectOnError option when multi-az
 // redis = new Redis(config.REDIS_PORT, config.REDIS_HOST);

  // process stream data
  parseKinesis(event.Records, IGS);

  // testing artifacts
  //console.log(IGS.events);
  //IGS.events = IGS.events.slice(0, 1);
  console.log("event-zero ::", IGS.events[0]);
  console.log("event-five ::", IGS.events[4]);
  console.log("event-count ::", IGS.events.length);

  // leave happy
  getOut();
};


// helpers
function parseKinesis(records, ledger) {
  // avoid empty strings (dynamodb-unfriendly)
  // obtain url-events from records
  var events = [];
  records.map((record) => {
   // parse kinesis data
    var buffer = new Buffer(record.kinesis.data, "base64");
    var payload = JSON.parse(buffer.toString("utf8"));
    // BUILD ARRAY of event objects
    //console.log (payload);
    events = events.concat(payload)
  });
  ledger.events = events;
}

<<<<<<< Updated upstream
=======
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
    else     console.log("ses.sendEmail :: ", data);
  });
}

>>>>>>> Stashed changes
function getOut(ledger) {
  // get done
 //  redis.quit();
}
