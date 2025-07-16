// src/config/database.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

// If Heroku set DATABASE_URL, use it; otherwise use local .env settings
const connectionString = process.env.DATABASE_URL
  ? process.env.DATABASE_URL
  : `postgres://${process.env.DB_USER}:${process.env.DB_PASS}` +
    `@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  dialectOptions: process.env.DATABASE_URL
    ? { ssl: { require: true, rejectUnauthorized: false } }
    : {},
});

module.exports = { sequelize };
