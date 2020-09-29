require('dotenv').config();
const User = require('../models/user_model');
const validator = require('validator');
const expire = process.env.TOKEN_EXPIRE;

const logIn = async (req, res) => {
  const userInf = {
    email: req.body.email,
    pwd: req.body.pwd,
  };
  if (!userInf.email || !userInf.pwd) {
    res.status(400).send({
      error: 'Request Error: email and password are required.',
    });
    return;
  }
  if (!validator.isEmail(userInf.email)) {
    res.status(400).send({ error: 'Request Error: Invalid email format' });
    return;
  }
  const result = await User.checkUser(userInf.email, userInf.pwd, expire);
  if (result.error) {
    res.status(403).send({ error: result.error });
    return;
  }
  res.status(200).send({
    data: {
      name: result[0].name,
      email: result[0].email,
      access_token: result[0].access_token,
      access_expired: result[0].expire,
      login_at: result[0].loginAt,
    },
  });
};

const signUp = async (req, res) => {
  const userInf = {
    name: req.body.name,
    email: req.body.email,
    pwd: req.body.pwd,
  };

  if (!userInf.name || !userInf.email || !userInf.pwd) {
    res.status(400).send({
      error: 'Request Error: name, email and password are required.',
    });
    return;
  }

  if (!validator.isEmail(userInf.email)) {
    res.status(400).send({ error: 'Request Error: Invalid email format' });
    return;
  }

  const name = validator.escape(userInf.name);
  const result = await User.createUser(
    name,
    userInf.email,
    userInf.pwd,
    expire
  );
  if (result.error) {
    res.status(403).send({ error: result.error });
    return;
  }
  res.status(200).send({
    data: {
      name: result.name,
      email: result.email,
      access_token: result.access_token,
      access_expired: result.expire,
      login_at: result.loginAt,
    },
  });
};

const checkToken = async (req, res) => {
  let accessToken = req.get('Authorization');
  if (accessToken) {
    accessToken = accessToken.replace('Bearer ', '');
  } else {
    res
      .status(400)
      .send({ error: 'Wrong Request: authorization is required.' });
    return;
  }
  const profile = await User.checkToken(accessToken);
  if (profile.error) {
    res.status(403).send({ error: profile.error });
    return;
  } else {
    res.status(200).send(profile);
  }
};

module.exports = {
  logIn,
  signUp,
  checkToken,
};