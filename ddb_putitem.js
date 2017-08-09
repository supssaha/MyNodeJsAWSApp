// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Load credentials and set region from JSON file
//AWS.config.loadFromPath('./config.json');
AWS.config.update({region:'us-east-1'});
// Create the DynamoDB service object
ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});

var params = {
  TableName: 'Product',
  Item: {
    'ProductCode' : {S: '001'},
    'ProductName' : {S: 'Marlboro Red'},
    'Description' : {S: 'Marlboro Red'},
    'Price': {S: 'Marlboro Red'},
    'ImagePath': {S: 'http://s3.'},
  }
};

// Call DynamoDB to add the item to the table
ddb.putItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});