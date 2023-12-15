const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
 designation:{type: String, required: true },
 roll:{type: String, required: true }


});
const User = mongoose.model('User', userSchema);
module.exports = User;
