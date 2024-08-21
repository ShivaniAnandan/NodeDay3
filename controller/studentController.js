import Student from '../Models/student.js';
import Mentor from '../Models/mentor.js';

// Create a new student
export const createStudent = async (req, res) => {
    try {
        const { name, batch, courseName, email } = req.body;

        // Validate required fields
        if (!name || !email || !courseName) {
            return res.status(400).json({ message: "Name, email, and courseName are required" });
        }

        // Check if email is already used
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(409).json({ message: "Student with this email already exists" });
        }

        // Create and save the student
        const newStudent = new Student({
            name,
            batch,
            courseName,
            email,
            mentorId: null, // Initially, no mentor assigned
            previousMentors: [] // Empty array for previous mentors
        });

        const savedStudent = await newStudent.save();
        res.status(201).json({ message: "Student created successfully", student: savedStudent });
    } catch (error) {
        res.status(500).json({ message: "Error creating student", error: error.message });
    }
};

// Assign or change mentor for a student
export const assignMentorToStudent = async (req, res) => {
    try {
        const { studentId, mentorId } = req.params;

        // Find the student by ID
        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ message: "Student not found" });

        // Find the mentor by ID
        const mentor = await Mentor.findById(mentorId);
        if (!mentor) return res.status(404).json({ message: "Mentor not found" });

        // If the student already has a mentor, add the current mentor to the previousMentors array
        if (student.mentorId) {
            student.previousMentors.push(student.mentorId);
        }

        // Assign the new mentor
        student.mentorId = mentor._id;

        // Update the mentor's student list if the student is not already in it
        if (!mentor.students.includes(student._id)) {
            mentor.students.push(student._id);
        }

        await student.save();
        await mentor.save();

        res.status(200).json({ message: "Mentor assigned successfully", student });
    } catch (error) {
        res.status(500).json({ message: "Error assigning mentor", error: error.message });
    }
};

// Show previously assigned mentors for a student
export const getPreviousMentorsForStudent = async (req, res) => {
    try {
        const { studentId } = req.params;

        // Find the student by ID
        const student = await Student.findById(studentId).populate('previousMentors', 'name email');
        if (!student) return res.status(404).json({ message: "Student not found" });

        res.status(200).json(student.previousMentors);
    } catch (error) {
        res.status(500).json({ message: "Error fetching previous mentors", error: error.message });
    }
};

// Get students without mentors
export const getStudentsWithoutMentors = async (req, res) => {
    try {
        // Find all students who do not have a mentor assigned
        const unassignedStudents = await Student.find({ mentorId: null });
        res.status(200).json(unassignedStudents);
    } catch (error) {
        res.status(500).json({ message: "Error fetching students without mentors", error: error.message });
    }
};




export const updateStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const { name, batch, courseName, email, mentorId } = req.body;

        // Validate required fields
        if (!name || !email || !courseName) {
            return res.status(400).json({ message: "Name, email, and courseName are required" });
        }

        // Find the student by ID
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Check if the email is already used by another student
        const existingStudent = await Student.findOne({ email });
        if (existingStudent && existingStudent._id.toString() !== studentId) {
            return res.status(409).json({ message: "Student with this email already exists" });
        }

        // Update the student fields
        student.name = name;
        student.batch = batch;
        student.courseName = courseName;
        student.email = email;
        student.mentorId = mentorId || null; // Update mentorId if provided, otherwise set to null

        // Save the updated student
        const updatedStudent = await student.save();
        
        res.status(200).json({ message: "Student updated successfully", student: updatedStudent });
    } catch (error) {
        res.status(500).json({ message: "Error updating student", error: error.message });
    }
};
