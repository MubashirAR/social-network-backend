const { Picture } = require('../../models').Picture;

const addPicture = picture => {
  // TODO: upload picture to s3
  return Picture.create(picture, {
    raw: true
  });
};
const deletePicture = async id => {
  const pic = await  Picture.findByPk(id);
  if(!pic){
    throw new Error('Picture not found!');
  }
  pic.isActive = false;
  return await pic.save();
};
module.exports = {
  addPicture,
  deletePicture
}