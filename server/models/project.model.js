const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name:String,

  description: String,

  user: [{type: Schema.Types.ObjectId, ref: "User"}],
  
  author: {type: Schema.Types.ObjectId, ref:"User"},
  
  roles: [{role:String, number:Number}],
  
  comments: [{comment: String, commenter: {type: Schema.Types.ObjectId, ref: "User"}}],
  
  votes: { votes: Number, voter:[{type : Schema.Types.ObjectId, ref:"User"}]},
  
  imageUrl: String
},
{timestamps: true});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;