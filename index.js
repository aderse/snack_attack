/* A very simple lambda function in js to send an email on the press of an IoT button trigger. */
var AWS = require('aws-sdk');
var ses = new AWS.SES({
    apiVersion: '2010-12-01',
    accessKeyId: 'add_access_key_here',
    secretAccessKey: 'add_secret_key_here',
    region: 'us-west-2'
});


exports.handler = function(event, context) {
  console.log('Received event:', JSON.stringify(event, null, 2));

  var from = "add_address_here";
  var to = "add_address_here";
  var subject = "Snack Attack!";

  var params = {
    Destination: { ToAddresses: [ to ] },
    Message: {
      Body: { Text: { Data: "Hurry! Snacks are available in the break room!", Charset: 'UTF-8' } },
      Subject: { Data: subject, Charset: 'UTF-8' }
    },
    Source: from,
    ReplyToAddresses: [ from ]
  };

  ses.sendEmail(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      context.fail(err);
    } else {
      console.log(data);
      context.succeed('Success!');
    }
  });
};