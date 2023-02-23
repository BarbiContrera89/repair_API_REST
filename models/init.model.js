const Repair = require('./repair.models');
const User = require('./user.models');

const initModel = () => {
  User.hasMany(Repair, { sourcekey: 'id', foreignKey: 'userId' });
  Repair.belongsTo(User, { sourceKey: 'id', foreignKey: 'userId' });
};

module.exports = initModel;
