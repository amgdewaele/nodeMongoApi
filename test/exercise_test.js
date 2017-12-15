const assert = require('assert');
const Exercise = require('../model/Exercise.model')

describe('Creating records', () => {
  it('saves a exercise', () => {
    const exercise = new Exercise({ bodyPart: 'Bovenbenen', name: 'leg extension', description: 'buig je benen lichtjes..', reps: 8, sets: 4 });

    exercise.save()
      .then(() => {
        assert(!exercise.isNew);
        done();
      });
  });
});

