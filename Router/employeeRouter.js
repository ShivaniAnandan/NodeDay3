import express from 'express';


const router = express.Router()

router.post('/create-emp', createEmployee)

export default router;