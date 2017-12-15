const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendScheme = new Schema({
  firstName:{
      type: String,
      required: true
  },
  lastName:{
      type: String,
      required: true
  },
  age: {
    type: Number,
    required: true
  }
})

const Friend = mongoose.model('friend', FriendScheme);


module.exports = Friend;