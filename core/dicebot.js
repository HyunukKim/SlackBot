var request = require('request');

module.exports = function (req, res, next) {
  // default roll is 2d6
  var matches;
  var times = 2;
  var die = 6;
  var rolls = [];
  var total = 0;

  if (req.body.text) {
    // parse roll type if specified
    matches = req.body.text.match(/^(\d{1,2})d(\d{1,2})$/);

    if (matches && matches[1] && matches[2]) {
      times = matches[1];
      die = matches[2];

    } else {
      // send error message back to user if input is bad
      return res.status(200).send('<number>d<sides>');
    }
  }

  // roll dice and sum
  for (var i = 0; i < times; i++) {
    var currentRoll = roll(1, die);
    rolls.push(currentRoll);
    total += currentRoll;
  }

  // write response message and add to payload
  var result = req.body.user_name + ' rolled ' + times + 'd' + die + ':\n' +
                    rolls.join(' + ') + ' = *' + total + '*';
  return result;
  // botPayload.username = 'Dicer';
  // botPayload.channel = req.body.channel_id;
  // botPayload.icon_emoji = ':game_die:';

  // send dice roll
  // send(botPayload, function (error, status, body) {
  //   if (error) {
  //     return next(error);

  //   } else if (status !== 200) {
  //     // inform user that our Incoming WebHook failed
  //     return next(new Error('Incoming WebHook: ' + status + ' ' + body));
  //   } else {
  //     return res.status(200).end();
  //   }
  // });
}


function roll (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


// function send (payload, callback) {
//   var uri = 'https://hooks.slack.com/services/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';
//   request({
//     uri: uri,
//     method: 'POST',
//     body: JSON.stringify(payload)
//   }, function (error, response, body) {
//     if (error) {
//       return callback(error);
//     }
//     callback(null, response.statusCode, body);
//   });
// }