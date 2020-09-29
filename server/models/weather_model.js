const {
  TaiPeiModel,
  NewTaipeiModel,
  TaoYuanModel,
} = require("../models/config/schema");

const cityWeather = async (city, date, time) => {

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
