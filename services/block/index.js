const { Block, BlockedBy, BlockedUser } = require('../../models').Block;

const blockUser = block => {
    return Block.create(block, {
      include: [BlockedBy,BlockedUser]
    });
}
const unblockUser = async id => {
  const block = await Block.findByPk(id);
  if(block.isActive === false){
    throw new Error('User is already unblocked!');
  }
  block.isActive = false;
  return await block.save();
}
module.exports = {
  blockUser,
  unblockUser
}