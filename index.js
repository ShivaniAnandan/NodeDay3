import express from 'express';
import mentorRoutes from './Router/mentorRoutes.js';
import studentRoutes from './Router/studentRoutes.js';
import dotenv from 'dotenv';
import connectDB from './Database/config.js';
const app = express();
dotenv.config();
// const PORT = 4000;
const PORT = process.env.PORT;
app.use(express.json())
connectDB();
app.get('/', (req,res)=>{
    res.status(200).send("example")
})

// app.get('/api/mentors/:id', async (req, res) => {
//     try {
//         const mentor = await getMentorById(req.params.id); // Replace with your actual function
//         if (!mentor) {
//             return res.status(404).json({ message: 'Mentor not found' });
//         }
//         res.json(mentor);
//     } catch (error) {
//         console.error('Error fetching mentor:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });


app.use('/api/mentors', mentorRoutes);
app.use('/api/students', studentRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})