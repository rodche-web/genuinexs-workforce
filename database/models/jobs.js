import { Schema, model, models } from "mongoose";

const JobSchema = new Schema({
    jobTitle: { type: String, required: true },
    department: { type: String, required: true },
    overview: { type: String },
    responsibilities: { type: String },
    education: { type: String },
    experience: { type: String },
    jobType: { type: String },
    location: { type: String },
    salaryRange: { type: String },
    benefits: { type: String },
    postingDate: { type: String },
    closingDate: { type: String },
  })
  
  const Job = models.Job || model('Job', JobSchema);
  
  export default Job;