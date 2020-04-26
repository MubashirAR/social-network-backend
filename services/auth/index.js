const models = require('../../models')
const register = async ({name, email, mobile, password, dob}) => {
  const user = await models.User.User.create({
    name, email, mobile, dob
  });
  return user;
};
const login = async ({email, password}) => {
  const user = await models.User.User.findOne({
    where: {
      email
    }
  });
  return user;
};
module.exports = {
  login,
  register
}