require('dotenv').config();
const { UserModel } = require('../models/config/schema');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const salt = parseInt(process.env.BCRYPT_SALT);

const checkToken = async (accessToken) => {
  try {
    const results = await UserModel.find({ access_token: accessToken });
    if (results.length === 0) {
      return { error: 'Invalid Access Token' };
    } else {
      return {
        data: {
          name: results[0].name,
          email: results[0].email,
        },
      };
    }
  } catch (error) {
    return { error };
  }
};

const checkUser = async (email, pwd, expire) => {
  try {
    const users = await UserModel.find({ email: email });
    if (users.length === 0) return { error: 'User does not exist!' };
    const user = users[0];
    if (!bcrypt.compareSync(pwd, user.pwd)) {
      return { error: 'Password is wrong' };
    }
    const loginAt = new Date();
    const sha = crypto.createHash('sha256');
    sha.update(email + pwd + loginAt);
    const accessToken = sha.digest('hex');
    await UserModel.findOneAndUpdate({email: email},
      {
        access_token: accessToken,
        access_expired: expire,
        login_at: loginAt,
      }
    );
    const result = await UserModel.find({email: email});
    return result;
  } catch (error) {
    return { error };
  }
};

const createUser = async (name, email, password, expire) => {
  try {
    const emails = await UserModel.find({ email: email });
    if (emails.length > 0) {
      return { error: 'Email Already Exists' };
    }
    const loginAt = new Date();
    const sha = crypto.createHash('sha256');
    sha.update(email + password + loginAt);
    const accessToken = sha.digest('hex');
    const user = {
      name: name,
      email: email,
      pwd: bcrypt.hashSync(password, salt),
      access_token: accessToken,
      access_expired: Number(expire),
      login_at: loginAt,
    };
    const newUser = new UserModel(user);
    await newUser.save();
    return newUser;
  } catch (error) {
    return { error };
  }
};

module.exports = {
  checkToken,
  checkUser,
  createUser,
};
