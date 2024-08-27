import express from 'express';
import { createStudent,assignMentorToStudent,getPreviousMentorsForStudent,getStudentsWithoutMentors } from '../controller/studentController.js';

const router = express.Router();


router.post('/', createStudent);
router.put('/:studentId/assign-mentor/:mentorId', assignMentorToStudent);
router.get('/:studentId/previous-mentors', getPreviousMentorsForStudent);
router.get('/without-mentor', getStudentsWithoutMentors);




export default router;