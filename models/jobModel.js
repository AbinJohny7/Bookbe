const mongoose = require("mongoose");
const jobSchema = mongoose.Schema({
  jobId: {
    type: String,
    require: true,
    unique: true,
  },
  jobRole: {
    type: String,
    require: true,
  },
  jobDesc: {
    type: String,
    require: true,
  },
  publishedDate: {
    type: String,
    require: true,
  },
  lastDate: {
    type: String,
    require: true,
  },
  salary: {
    type: String,
    require: true,
  },
  experience: {
    type: String,
    require: true,
  },
});
const jobModel=new mongoose.model('jobs',jobSchema)
module.exports=jobModel
