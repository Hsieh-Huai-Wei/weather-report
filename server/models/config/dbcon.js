require('dotenv').config();
const mongoose = require('mongoose');
const env = process.env.NODE_ENV || 'production';

const mongoConfig = {
  production: {
    // for EC2 machine
    host: process.env.DB_CONNECTION,
  },
  development: {
    // for localhost development
    host: process.env.DB_CONNECTION_LOCAL,
  },
  test: {
    // for automation testing (command: npm run test)
    host: process.env.DB_CONNECTION_TEST,
  },
};


const connect = mongoose.connect(mongoConfig[env].host, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.once('open', (_) => {
  console.log('Database connected:', mongoConfig[env].host);
});

db.on('error', (err) => {
  console.error('connection error:', err);
});

module.exports = {
  connect,
  db,
};
