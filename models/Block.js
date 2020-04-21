const { DataTypes } = require('sequelize');
const database = require('../config/database').database;
const User = require('./User');

const Block = database.define(
  'block',
  {
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    underscored: true
  }
);

const BlockedBy = Block.belongsTo(User.User, { as: 'BlockedBy' });
const BlockedUser = Block.belongsTo(User.User, { as: 'BlockedUser' });
Block.afterValidate(({ dataValues }) => {
  if (!dataValues.BlockedById || !dataValues.BlockedUserId) {
    throw new Error(`BlockedById & BlockedUserId are required.`);
  }
  if (dataValues.BlockedById === dataValues.BlockedUserId) {
    throw new Error(`You can't block yourself!`);
  }
});
module.exports = {
  Block,
  BlockedBy,
  BlockedUser,
};
