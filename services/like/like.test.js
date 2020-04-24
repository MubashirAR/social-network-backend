const faker = require('faker');
const moment = require('moment');
const like = require('./index');
const user = require('../auth');
const post = require('../post');

describe('Like', () => {
  let newUser, newPost;
  beforeAll(async () => {
    newUser = await user.register({
      name: faker.name.findName(),
      email: faker.internet.email(),
      mobile: faker.phone.phoneNumber(),
      dob: moment().subtract(10, 'years')
    });
    console.log(newUser.id)
    newPost = await post.createPost({
      text: 'This is a posst to be liked',
      CreatedById: newUser.id,
      postType: 'post'
    })
  });
  test('should be added', async () => {
    const newLike = await like.addLike({
      likedType: 'post',
      PostId: newPost.id,
      LikedById: newUser.id
    });
    expect(newLike.id).toBeTruthy();
  });
  test('should be removed', async () => {
    const newLike = await like.removeLike({
      PostId: newPost.id,
      LikedById: newUser.id
    });
    expect(newLike.isActive).toBe(false);
  });
});
