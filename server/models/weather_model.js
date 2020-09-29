const {
  TaiPeiModel,
  NewTaipeiModel,
  TaoYuanModel,
} = require('../models/config/schema');

const cityWeather = async (city, date, time) => {
  let result;
  switch (city) {
    case 'taipei':
      return await TaiPeiModel.find({
        city: '臺北',
        date: date,
        time: time,
      });
    case 'newtaipei':
      result = await NewTaipeiModel.find({
        city: '板橋',
        date: date,
        time: time,
      });
      return result;
    case 'taoyuan':
      result = await TaoYuanModel.find({
        city: '新屋',
        date: date,
        time: time,
      });
      return result;
  }
};

const createCityWeather = async (taipei, newTaipei, taoyuan) => {
  const TaiPei = new TaiPeiModel(taipei);
  await TaiPei.save();
  const NewTaipei = new NewTaipeiModel(newTaipei);
  await NewTaipei.save();
  const TaoYuan = new TaoYuanModel(taoyuan);
  await TaoYuan.save();
  return;
};

module.exports = {
  cityWeather,
  createCityWeather,
};
