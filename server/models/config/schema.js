const mongoose = require('mongoose');

const CityModelSchema = new mongoose.Schema({
  city: String,
  date: String,
  time: Number,
  temp: Number,
  description: String,
});

const TaiPeiModel = mongoose.model('taipei', CityModelSchema);
const NewTaipeiModel = mongoose.model('new_taipei', CityModelSchema);
const TaoYuanModel = mongoose.model('taoyuan', CityModelSchema);

const UserModelSchema = new mongoose.Schema({
  name: String,
  email: String,
  pwd: String,
  access_token: String,
  access_expired: Number,
  login_at: String,
});

const UserModel = mongoose.model('user', UserModelSchema);

module.exports = {
  TaiPeiModel,
  NewTaipeiModel,
  TaoYuanModel,
  UserModel,
};
