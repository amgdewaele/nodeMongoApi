const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonalSchema = new Schema({
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
});


const Personal = mongoose.model('personal', PersonalSchema);

module.exports = Personal;