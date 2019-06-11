const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  access:{
    type: String,
    enum:["user", "admin"]
  },
  friends:[{
    type:Schema.Types.ObjectId,
  }],
  project:[{
    type: Schema.Types.ObjectId,    
  }],
  field: String,
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
