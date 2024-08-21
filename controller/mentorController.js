import Mentor from '../Models/mentor.js';
import Student from '../Models/student.js'; 

// Create a new mentor
export const createMentor = async (req, res) => {
    try {
        const { name, batch, email, courseName } = req.body;

        // Validate required fields
        if (!name || !email || !courseName) {
            return res.status(400).json({ message: "Name, email, and courseName are required" });
        }

        // Check if email is already used
        const existingMentor = await Mentor.findOne({ email });
        if (existingMentor) {
            return res.status(409).json({ message: "Mentor with this email already exists" });
        }

        // Create a new mentor
        const newMentor = new Mentor({
            name,
            batch,
            email,
            courseName,
            students: [] // Initialize with an empty array
        });

        // Save the mentor to the database
        const savedMentor = await newMentor.save();

        res.status(201).json({ message: "Mentor created successfully", mentor: savedMentor });
    } catch (error) {
        res.status(500).json({ message: "Error creating mentor", error: error.message });
    }
};

// Assign multiple students to a mentor
export const assignStudentsToMentor = async (req, res) => {
    try {
        const { mentorId } = req.params;
        const { studentIds } = req.body;

        // Find the mentor by ID
        const mentor = await Mentor.findById(mentorId);
        if (!mentor) return res.status(404).json({ message: "Mentor not found" });

        // Find students and assign them to the mentor if they don’t already have one
        const studentsToUpdate = await Student.find({ _id: { $in: studentIds }, mentor: null });

        if (studentsToUpdate.length === 0) {
            return res.status(400).json({ message: "No students available to assign" });
        }

        // Update the students to reference the mentor
        await Student.updateMany(
            { _id: { $in: studentsToUpdate.map(student => student._id) } },
            { mentor: mentor._id }
        );

        // Add the students to the mentor's list
        mentor.students.push(...studentsToUpdate.map(student => student._id));
        await mentor.save();

        res.status(200).json({ message: "Students assigned successfully", mentor });
    } catch (error) {
        res.status(500).json({ message: "Error assigning students", error: error.message });
    }
};

// Show all students for a specific mentor
export const getStudentsForMentor = async (req, res) => {
    try {
        const { mentorId } = req.params;

        // Find the mentor and populate the student details
        const mentor = await Mentor.findById(mentorId).populate('students');
        if (!mentor) return res.status(404).json({ message: "Mentor not found" });

        res.json(mentor.students);
    } catch (error) {
        res.status(500).json({ message: "Error fetching students", error: error.message });
    }
};
