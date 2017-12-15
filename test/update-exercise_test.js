const assert = require('assert');
const Exercise = require('../model/Exercise.model');

describe('Updating records', () => {
    let exercise;

    beforeEach(() => {
    exercise = new Exercise({ bodyPart: 'Bovenbenen', name: 'leg extension', description: 'buig je benen lichtjes..', reps: 8, sets: 4  });
    exercise.save()
      .then(() => done());
  });

  function assertName(operation) {
    operation
      .then(() => Exercise.find({}))
      .then((exercise) => {
        assert(exercise.length === 1);
        assert(exercise[0].bodyPart === 'kuiten', exercise[0].name === 'kuiten', exercise[0].description === 'strek je kuiten', exercise[0].reps === 5, exercise[0].sets === 10);
        done();
      });
  }

  it('instance type using set n save', () => {
    exercise.set('bodyPart','kuiten');
    assertName(exercise.save());
  });

    it('A model instance can update', () => {
    assertName(exercise.update({ bodyPart: 'kuiten' ,name: 'kuiten', description:'strek je kuiten', reps: 5 , sets: 10}));
  });

});


