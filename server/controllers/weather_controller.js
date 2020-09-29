const moment = require('moment');
const Weather = require('../models/weather_model');

const searchCity = async (req, res) => {
  const city = req.params.city;
  const date = moment().format('YYYY-MM-DD');
  const time = moment().format('HH');
  let result = await Weather.cityWeather(city, date, time);
  if (result.length !== 0) {
    res.status(200).send({ data: result });
  } else {
    let oldTime = Number(time);
    oldTime -= 1;
    if (oldTime < 0) {
      oldTime = 23;
      const oldDay = Number(date.split('-')[2])-1;
      const oldDate = date.split('-')[0] + '-' + date.split('-')[1] + '-' + String(oldDay);
      result = await Weather.cityWeather(city, oldDate, oldTime);
      res.status(200).send({ data: result });
    } else {
      result = await Weather.cityWeather(city, date, oldTime);
      res.status(200).send({ data: result });
    }
  }
};

module.exports = {
  searchCity,
};