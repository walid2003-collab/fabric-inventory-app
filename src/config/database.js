// src/config/database.js
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const { Sequelize } = require('sequelize');

let sequelize;
if (process.env.DATABASE_URL) {
  // Heroku ‑ use the full URL with SSL
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false }
    },
  });
} else {
  // Local: pull from env (loaded by dotenv)
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host:    process.env.DB_HOST,
      port:    process.env.DB_PORT,
      dialect: 'postgres',
    }
  );
}

module.exports = { sequelize };
