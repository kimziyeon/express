const pushRouter = require('express').Router();
const webpush = require('web-push');

const vapidKeys = webpush.generateVAPIDKeys();

webpush.setVapidDetails(
  'mailto:yicha7@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

pushRouter.get('/', async function (req, res) {
    res.send('push ready...');
})

pushRouter.get('/publicKey', function (req, res) {
  res.send(vapidKeys.publicKey)
})

pushRouter.post('/sendNoti', function (req, res) {

  let data = JSON.stringify({msg:'hello pwa'})

  setTimeout(function () {
      webpush.sendNotification(req.body.subscribe,data)
      .then(function () {
        res.sendStatus(202);
      })
      .catch(function (error) {
          res.sendStatus(500);
          console.log(error);
      });
  }, 3000);

})

module.exports = pushRouter;



