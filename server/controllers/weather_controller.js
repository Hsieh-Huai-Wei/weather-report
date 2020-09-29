const moment = require('moment');
const weather = require('../models/weather_model');

const searchCity = async (req, res) => {
  const city = req.params.city;
  const date = moment().format('YYYY-MM-DD');
  const time = moment().format('HH');
  let result = await weather.cityWeather(city, date, time);
  if (result.length !== 0) {
    res.status(200).send({ data: result });
  } else {
    let oldTime = Number(time);
    oldTime -= 1;
    if (oldTime < 0) {
      oldTime = 23;
      const oldDay = Number(date.split('-')[2])-1;
      const oldDate = date.split('-')[0] + '-' + date.split('-')[1] + '-' + String(oldDay);
      console.log(oldDay);
      console.log(oldDate);
      result = await weather.cityWeather(city, oldDate, oldTime);
      res.status(200).send({ data: result });
    } else {
      result = await weather.cityWeather(city, date, oldTime);
      res.status(200).send({ data: result });
    }
  }
};

module.exports = {
  searchCity,
};