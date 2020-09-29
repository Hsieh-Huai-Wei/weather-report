const router = require('express').Router();

const {
  searchCity,
} = require('../controllers/weather_controller');

const {
  logIn,
  signUp,
  checkToken,
} = require('../controllers/user_controller');

router.route('/city/:city').get(searchCity);
router.route('/logIn').post(logIn);
router.route('/signUp').post(signUp);
router.route('/checkToken').get(checkToken);

module.exports = router;
