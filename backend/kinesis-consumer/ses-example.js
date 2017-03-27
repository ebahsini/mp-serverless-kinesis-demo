const REGION = "us-east-1"
// aws configuration
const AWS = require("aws-sdk")
AWS.config.update({
  region: REGION
})
const ses = new AWS.SES()

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

sendAlertEmail()
