const router = require('express').Router();

const { searchCity } = require('../controllers/weather_controller');

router.route('/city/:city').get(searchCity);

module.exports = router;
