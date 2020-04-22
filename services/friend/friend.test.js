const faker = require('faker');
const moment = require('moment');
const friend = require('./index');
const user = require('../auth');
const database = require('../../config/database').database;

describe('Friend Request', () => {
  let newFriend, newUser1, newUser2, newUser3, newUser4, newUser5;
  beforeAll(async () => {
    newUser1 = await user.register({
      name: faker.name.findName(),
      email: faker.internet.email(),
      mobile: faker.phone.phoneNumber(),
      dob: moment().subtract(10, 'years'),
    });
    newUser2 = await user.register({
      name: faker.name.findName(),
      email: faker.internet.email(),
      mobile: faker.phone.phoneNumber(),
      dob: moment().subtract(10, 'years'),
    });
    // Register 1 user
    newUser3 = await user.register({
      name: faker.name.findName(),
      email: faker.internet.email(),
      mobile: faker.phone.phoneNumber(),
      dob: moment().subtract(10, 'years'),
    });
    // Register 2 users
    newUser4 = await user.register({
      name: faker.name.findName(),
      email: faker.internet.email(),
      mobile: faker.phone.phoneNumber(),
      dob: moment().subtract(10, 'years'),
    });
    newUser5 = await user.register({
      name: faker.name.findName(),
      email: faker.internet.email(),
      mobile: faker.phone.phoneNumber(),
      dob: moment().subtract(10, 'years'),
    });
  });
  afterAll(async () => {
    await database.close();
  });
  test('should be created', async () => {
    // Send a friend request
    newFriend = await friend.addFriend({
      RequestedById: newUser1.id,
      RequestedToId: newUser2.id,
    });
    expect(newFriend.id).toBeTruthy();
  });
  test('should NOT be created', async () => {
    let err = {};
    try {
      // Send a friend request to self
      newFriend = await friend.addFriend({
        RequestedById: newUser3.id,
        RequestedToId: newUser3.id,
      });
    } catch (error) {
      err = error;
    }
    expect(err.message).toBeTruthy();
  });
  test('should be accepted', async () => {
    const accept = await friend.acceptFriend(newFriend.id);
    expect(accept.isAccepted).toBeTruthy();
    expect(accept.isRejected).toBeFalsy();
  });
  test('should NOT be accepted', async () => {
    let err = {};
    try {
      const accept = await friend.acceptFriend(newFriend.id);
      expect(accept).toBeFalsy();
    } catch (error) {
      err = error;
    }
    expect(err.message).toBeTruthy();
  });
  test('should NOT be rejected', async () => {
    let err = {};
    try {
      const reject = await friend.rejectFriend(newFriend.id);
      expect(reject).toBeFalsy();
    } catch (error) {
      err = error;
    }
    expect(err.message).toBeTruthy();
  });
  test('should be rejected', async () => {
    // Add a friend request
    newFriend = await friend.addFriend({
      RequestedById: newUser4.id,
      RequestedToId: newUser5.id,
    });
    // Reject the friend request
    const reject = await friend.rejectFriend(newFriend.id);
    expect(reject.isAccepted).toBeFalsy();
    expect(reject.isRejected).toBeTruthy();
  });
});
