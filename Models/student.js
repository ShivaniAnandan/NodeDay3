import mongoose from "mongoose";


const studentSchema = new mongoose.Schema({
    name: String,
    batch:String,
    courseName:String,
    email: String,
    mentorId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' },
    previousMentors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' }]
})

const student = mongoose.model('Student', studentSchema);

export default student;