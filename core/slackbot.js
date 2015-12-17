var diceBot = require('./dicebot');

module.exports = function (req, res, next) {
  var trigger = req.body.trigger_word;
  var regx = new RegExp(trigger+'(.*)(\\s)(.*)');
  var matches = regx.exec(req.body.text);
  var botPayload = {};

  console.log('matches : ' + matches);
  if (matches) {
    var command = matches[1]; // 명령어
    if (command === 'dice') {
      req.body.text = matches[3];
      console.log('body text : ' + req.body.text);
      botPayload.text = diceBot(req, res, next);
      console.log('result : ' + botPayload.text);
    }
    res.status(200).json(botPayload);
    // console.log('command : ' + command);
  } else {
    botPayload.text = '```' + '* * * * * Command List * * * * *\n\n' + trigger +'dice <number>d<sides> : ex)' + trigger + 'dice 2d6 -> 6면 주사위를 2번 굴린다.\n' + '\n* 대소문자 구분 주의 * \n' + '```';
    res.status(200).json(botPayload);
  }


  // var command = req.body.text.substring(triggerWord.length);
  // console.log('trigger : ' + triggerWord+'length : ' + triggerWord.length);
  // console.log('command : ' + command);
  // console.log('comman1 : ' + command.trim());
  // if (command.length == 0 || command === '') {
  //   // 빈 문자열 - trigger word만 존재
  //   // 명령어 리스트 소개

  // } else {  // 명령 부분
  //   var matches = command.match(/^(\d{1,2})d(\d{1,2})$/);
  //   if (matches && matches[1] && matches[2]) {
  //     req.body.text = command;
  //     //diceBot(req, res, next);
  //     return;
  //   }

  //   console.log('next?');
  // }
  // // avoid infinite loop
  // res.status(200).end();
}