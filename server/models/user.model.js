const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  email:String,

  username: String,

  password: String,

  company:String,

  ideas: [{type: Schema.Types.ObjectId, ref: "Project"}],

  pastProjects:[{type: Schema.Types.ObjectId, ref: "Project"}],

  currnetProject: {type: Schema.Types.ObjectId, ref: "Project"},

  access:{ type: String, enum:["user", "admin"], default:"user"},

  friends:[{type:Schema.Types.ObjectId, ref:"User"}],

  role: String,

  level:{type: String, enum:["rusty","iron", "bronze", "silver", "gold", "pltinum"], default:"iron"},

  imageUrl: String

}, 
{ timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;
