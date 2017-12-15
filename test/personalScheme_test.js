const assert = require('assert');
const PersonalScheme = require('../model/PersonalScheme.model')

describe('Creating records', () => {
  it('saves a personalScheme', () => {
    const scheme = new PersonalScheme({ bodyPart: 'onderrug', name: 'dips', description: 'buig licht voorover' });

    scheme.save()
      .then(() => {
        assert(!scheme.isNew);
        done();
      });
  });
});