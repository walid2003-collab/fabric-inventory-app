// src/models/index.js
const { sequelize, Sequelize } = require('../config/database');

// Ensure globalOptions.define is always an object:
if (!sequelize.options.define) {
  sequelize.options.define = {};
}

const FabricType = require('./fabricType');
const Roll = require('./roll');
const Transaction = require('./transaction');
const User = require('./user');

FabricType.initModel(sequelize);
Roll.initModel(sequelize);
Transaction.initModel(sequelize);
User.initModel(sequelize);

FabricType.hasMany(Roll, { foreignKey: 'fabric_type_id' });
Roll.belongsTo(FabricType, { foreignKey: 'fabric_type_id' });
Roll.hasMany(Transaction, { foreignKey: 'roll_id' });
Transaction.belongsTo(Roll, { foreignKey: 'roll_id' });
User.hasMany(Transaction, { foreignKey: 'user_id' });
Transaction.belongsTo(User, { foreignKey: 'user_id' });

module.exports = { sequelize, FabricType, Roll, Transaction, User };
