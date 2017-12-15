const assert = require('assert');
const Exercise = require('../model/Exercise.model');

describe('Deleting a exercise', () => {
  let exercise;

  beforeEach(() => {
    exercise = new Exercise({ bodyPart: 'Bovenbenen', name: 'leg extension', description: 'buig je benen lichtjes..', reps: 8, sets: 4  });
    exercise.save()
      .then(() => done());
  });

  it('model instance remove', () => {
    exercise.remove()
      .then(() => Exercise.findOne({ bodyPart: 'Bovenbenen', name: 'leg extension', description: 'buig je benen lichtjes..', reps: 8, sets: 4 }))
      .then((exercise) => {
        assert(exercise === null);
        done();
      });
  });

  it('class method findByIdAndRemove', () => {
    Exercise.findByIdAndRemove(exercise._id)
   
      .then(() => Exercise.findOne({ bodyPart: 'Bovenbenen', name: 'leg extension', description: 'buig je benen lichtjes..', reps: 8, sets: 4  }))
      .then((exercise) => {
        assert(exercise === null);
        done();
      }); 
      console.log( Exercise.findByIdAndRemove(exercise._id))
  });
});