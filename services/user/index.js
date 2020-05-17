const models = require('../../models');
const database = require('../../config/database');
const Op = database.database.Op;

const getAllUsers = async ({ text }) => {
  let where = null;
  if (text) {
    where = {
      $or: [
        {
          email: {
            $eq: text,
          },
        },
        {
          mobile: {
            $eq: text,
          },
        },
        {
          name: {
            $like: `%${text}%`,
          },
        },
      ],
    };
  }
  let users = await models.User.User.findAll({
    where,
    // order: [['createdAt', 'DESC']],
    // include: [models.associations.User.friends, models.associations.User.friends2],
    include: [
      {
        model: models.Friend.Friend,
        as: 'FriendRequestsSent',
        // include: [
        //   {
        //     model: models.User.User,
        //     as: 'RequestedBy',
        //   },
        //   {
        //     model: models.User.User,
        //     as: 'RequestedTo',
        //   },
        // ],
      },
      {
        model: models.Friend.Friend,
        as: 'FriendRequestsReceived',
        // include: [
        //   {
        //     model: models.User.User,
        //     as: 'RequestedBy',
        //   },
        //   {
        //     model: models.User.User,
        //     as: 'RequestedTo',
        //   },
        // ],
      },
    ],
  });
  // posts = posts
  //   .filter((p) => p)
  //   .map((p) => {
  //     p = p.get();
  //     let likes = p.likes.filter((l) => l).map((l) => l.get());
  //     p.likes = likes;
  //     return p;
  //   });
  // return posts;
  // users = users.map(u => {
  //   const user = u.get();
  //   console.log({user})
  //   // const friends = user.friends.map(friend => friend.get());
  //   // user.friends = friends;
  //   return user;
  // })
  users = JSON.parse(JSON.stringify(users));
  return users;
};
module.exports = {
  getAllUsers,
};
