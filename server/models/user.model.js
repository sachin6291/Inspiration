const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  access:{
    type: String,
    enum:["user", "admin"], 
    default:"user"
  },
  friends:[{
    type:Schema.Types.ObjectId,
    ref:"User"
  }],
  project:[{
    type: Schema.Types.ObjectId,
    ref:"Project"    
  }],
  role: String,
  level:[{
    type: String,
    enum:["rusty","iron", "bronze", "silver", "gold", "pltinum"],
    default:"iron"
  }]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
