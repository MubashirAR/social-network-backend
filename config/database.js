const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('socialnetwork', 'mubashir', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
sequelize.sync({ force: true }).then(() => {
  console.log('allsync');
});
module.exports.database = sequelize;
