const { DataTypes } = require('sequelize');
const { db } = require('../dataBase/db');

const User = db.define('user', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNum: false,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'client',
    enum: ['client', 'empoyee'],
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'available',
    enum: ['unavailable', 'available']
  },
});

module.exports = User;
