import express from 'express';
import { createMentor,assignStudentsToMentor,getStudentsForMentor } from '../controller/mentorController.js';

const router = express.Router();


router.post('/', createMentor);
router.put('/:mentorId/assign-students', assignStudentsToMentor);
router.get('/:mentorId/students', getStudentsForMentor);

export default router;