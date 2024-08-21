import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
    name: String,
    batch:String,
    email: String,
    courseName:String,
    students:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
})

const mentor = mongoose.model('Mentor',mentorSchema);

export default mentor;