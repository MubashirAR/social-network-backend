const { DataTypes } = require('sequelize');
const database = require('../config/database').database;

const Picture = database.define(
  'picture',
  {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: { msg: `Invalid url. Please enter a valid url.` },
      },
    },
    type: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['profile', 'post'],
    },
    profileId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'posts',
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
    underscored: true
  }
);
Picture.beforeValidate(({ dataValues }) => {
  if (dataValues.type === 'profile' && !dataValues.profileId) {
    throw new Error(`profileId missing`);
  }
  if (dataValues.type === 'post' && !dataValues.postId) {
    throw new Error(`postId missing`);
  }
});
module.exports = { Picture };
