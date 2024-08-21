import express from 'express';
import { createStudent,assignMentorToStudent,getPreviousMentorsForStudent,getStudentsWithoutMentors,updateStudent } from '../controller/studentController.js';

const router = express.Router();


router.post('/', createStudent);
router.put('/:studentId/assign-mentor/:mentorId', assignMentorToStudent);
router.get('/:studentId/previous-mentors', getPreviousMentorsForStudent);
router.get('/without-mentor', getStudentsWithoutMentors);
router.put('/:studentId', updateStudent);



export default router;