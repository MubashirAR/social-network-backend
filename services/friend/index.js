const { Friend, RequestedBy, RequestedTo } = require('../../models').Friend;

const addFriend = async (friend) => {
  const newFriend = await Friend.create(friend, {
    // include: [RequestedBy, RequestedTo],
  });
  return newFriend;
};
const acceptFriend = async ({ RequestedById, RequestedToId }) => {
  console.log({ RequestedById, RequestedToId });
  const friend = await Friend.findOne({
    where: {
      RequestedById,
      RequestedToId,
      isAccepted: false,
      isActive: true,
      isRejected: false,
    },
  });
  if (!friend) {
    throw new Error('Cannot find this friend request!');
  }
  friend.isAccepted = true;
  return await friend.save();
};
const rejectFriend = async ({ RequestedById, RequestedToId }) => {
  console.log({ RequestedById, RequestedToId })
  const friend = await Friend.findOne({
    where: {
      RequestedById,
      RequestedToId,
      isAccepted: false,
      isActive: true,
      isRejected: false,
    },
  });
  if (!friend) {
    throw new Error('Cannot find this friend request!');
  }
  friend.isRejected = true;
  return await friend.save();
};
const removeFriend = async ({ RequestedById, RequestedToId }) => {
  console.log({RequestedById, RequestedToId})
  const friend = await Friend.findOne({
    where: {
      RequestedById,
      RequestedToId,
      isActive: true,
      isAccepted: true,
    },
  });
  if (!friend) {
    throw { msg: 'Connection details not found' };
  }
  friend.isActive = false;
  return await friend.save();
};
module.exports = {
  addFriend,
  acceptFriend,
  rejectFriend,
  removeFriend,
};
