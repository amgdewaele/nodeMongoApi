const assert = require('assert');
const Friend = require('../model/Friend.model')

describe('Creating records', () => {
  it('saves a friend', () => {
    const friend = new Friend({ firstName: 'kees', lastName: 'van aart', age: 20 });

    friend.save()
      .then(() => {
        assert(!friend.isNew);
        done();
      });
  });
});