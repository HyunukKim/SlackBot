module.exports = function (req, res, next) {
  var userName = req.body.user_name;
  var botPayload = {
    text : 'Hello, ' + userName + '!'
  };

  // avoid infinite loop
  console.log('username : ' + userName);
  console.log('req' : req);
  if (userName !== 'slackbot') {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  }
}