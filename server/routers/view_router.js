const router = require('express').Router();
const path = require('path');

router.route('/').get((req, res)=>{
  res.sendFile(path.join(__dirname + '../../../public/weather.html'));
});

router.route('/login').get((req, res) => {
  res.sendFile(path.join(__dirname + '../../../public/login.html'));
});

module.exports = router;