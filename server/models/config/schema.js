const mongoose = require('mongoose');

const NewsModelSchema = new mongoose.Schema({
  city: String,
  date: String,
  time: Number,
  temp: Number,
  description: String,
});

const TaiPeiModel = mongoose.model('taipei', NewsModelSchema);
const NewTaipeiModel = mongoose.model('new_taipei', NewsModelSchema);
const TaoYuanModel = mongoose.model('taoyuan', NewsModelSchema);

module.exports = {
  TaiPeiModel,
  NewTaipeiModel,
  TaoYuanModel,
};
