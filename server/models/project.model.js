const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name:String,
  user:[{
    type:Schema.Types.ObjectId,
    ref: "User"
  }],
  role: {
    type:[String]
  },
}, {
    timestamps: true
  });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;