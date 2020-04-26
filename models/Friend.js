const database = require('../config/database').database;
const User = require('./User');
const { DataTypes } = require('sequelize');
const queryInterface  = database.getQueryInterface();

const Friend = database.define(
  'friend',
  {
    // RequestedById: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'user',
    //     key: 'id',
    //   },
    // },
    // RequestedToId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'user',
    //     key: 'id',
    //   },
    // },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    isAccepted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isRejected: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    underscored: true
  }
);
const RequestedBy = Friend.belongsTo(User.User, { as: 'RequestedBy' });
const RequestedTo = Friend.belongsTo(User.User, { as: 'RequestedTo' });
Friend.afterValidate(({ dataValues }) => {
  if (!dataValues.RequestedById || !dataValues.RequestedToId) {
    throw new Error(`RequestedById & RequestedToId are required!`);
  }
  if (dataValues.RequestedById === dataValues.RequestedToId) {
    throw new Error(`You cannot add yourself as a friend!`);
  }
});
// queryInterface.addConstraint('friends', ['requested_by_id', 'requested_to_id'], {
//   type: 'unique'
// })
module.exports = { Friend, RequestedBy, RequestedTo };
