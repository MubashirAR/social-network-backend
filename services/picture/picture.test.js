const faker = require('faker');
const moment = require('moment');
const picture = require('./index');
const user = require('../auth');
const post = require('../post');

describe('Picture', () => {
  let newUser, newPost;
  beforeAll(async () => {
    newUser = await user.register({
      name: faker.name.findName(),
      email: faker.internet.email(),
      mobile: faker.phone.phoneNumber(),
      dob: moment().subtract(10, 'years'),
    });
    newPost = await post.createPost({
      text: 'This is a post with a picture',
      CreatedById: newUser.id,
      postType: 'post',
    });
  });
  test('should NOT be created for profile', async () => {
    let err = {};
    try {
      const pic = await picture.addPicture({
        url: faker.internet.url(),
        type: 'profile',
      });
    } catch (error) {
      err = error;
    }
    expect(err.message).toBeTruthy();
  });
  test('should be created for profile', async () => {
    const newPicture = await picture.addPicture({
      url: faker.internet.url(),
      type: 'profile',
      profileId: newUser.id,
    });
    expect(newPicture).toBeTruthy();
  });
  test('should NOT be created for post', async () => {
    let err = {};
    try {
      const newPicture = await picture.addPicture({
        url: faker.internet.url(),
        type: 'post'
      });
    } catch (error) {
      err = error;
    }
    expect(err.message).toBeTruthy();
  });
  test('should be created for post', async () => {
    const newPicture = await picture.addPicture({
      url: faker.internet.url(),
      type: 'post',
      postId: newPost.id,
    });
    newPost = await post.getPost({
      id: newPost.id,
    });
    expect(newPicture.postId).toBeTruthy();
  });
});
