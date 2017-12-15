const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    bodyPart: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
	description: {
        type: String,
        required: true
    },
    reps:{
        type: Number
        
    },
    sets:{
        type: Number
        
    }
});


const ExerciseItem = mongoose.model('exercise', ExerciseSchema);

module.exports = ExerciseItem;