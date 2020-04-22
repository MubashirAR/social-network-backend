const {Friend, RequestedBy, RequestedTo} = require('../../models').Friend;

const addFriend = friend => {
  return Friend.create(friend, {
    include: [RequestedBy, RequestedTo]
  });
};
const acceptFriend = async id => {
  const friend = await Friend.findOne({
    where: {
      id,
      isAccepted: false,
      isRejected: false
    }
  });
  friend.isAccepted = true;
  return await friend.save();
};
const rejectFriend = async id => {
  const friend = await Friend.findOne({
    where: {
      id,
      isAccepted: false,
      isRejected: false
    }
  });
  if(!friend){
    throw new Error('Cannot find this friend request!');
  }
  friend.isRejected = true;
  return await friend.save();
};
const removeFriend = async id => {
  const friend = await Friend.findByPk(id);
  friend.isActive = false;
  return await friend.save();
};
module.exports = {
  addFriend,
  acceptFriend,
  rejectFriend,
  removeFriend
}