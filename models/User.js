const { Sequelize, Model, DataTypes } = require('sequelize');
const database = require('../config/database').database;
const moment = require('moment');

const User = database.define(
  'user',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // username: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   unique: { msg: 'Username is taken! Please another username.' },
    //   validate: {

    //   }
    // },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'This email is already registered! Please login to continue' },
      validate: {
        isEmail: { msg: 'Please enter a valid email ID' },
      },
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'Mobile number already registered!' },
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isBefore: {
          args: moment()
            .subtract(9, 'years')
            .format('YYYY-MM-DD'),
          msg: 'Sorry, you are too young to signup!',
        },
      },
    },
    // profile_picture: {
    //   type: DataTypes.NUMBER,
    //   references: {
    //     model: 'pictures',
    //     key: 'id',
    //   },
    // },
  },
  {
    timestamps: true,
    underscored: true
  }
);
// User.sync({ force: true }).then(() => {
//   console.log('synced');
// });
module.exports = { User };
