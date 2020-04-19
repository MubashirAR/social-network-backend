const database = require('../config/database').database;
const User = require('./User');
const { DataTypes } = require('sequelize');

let Friend = database.define(
  'friend',
  {
    // _requestedBy: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'user',
    //     key: 'id',
    //   },
    // },
    // _requestedTo: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'user',
    //     key: 'id',
    //   },
    // },
    isAccepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isRejected: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);
const RequestedBy = Friend.belongsTo(User, { as: 'RequestedBy' });
const RequestedTo = Friend.belongsTo(User, { as: 'RequestedTo' });
Friend.afterValidate(({ dataValues }) => {
  if (!dataValues.RequestedById || !dataValues.RequestedToId) {
    throw new Error(`RequestedById & RequestedToId are required!`);
  }
  if (dataValues.RequestedById === dataValues.RequestedToId) {
    throw new Error(`You cannot add yourself as a friend!`);
  }
});
module.exports = { Friend, RequestedBy, RequestedTo };
