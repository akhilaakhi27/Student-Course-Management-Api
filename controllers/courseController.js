const Course = require('../models/Course');
const User = require('../models/User');

// Add Course
const createCourse = async (req, res) => {
  const { title, description } = req.body;

  try {
    const course = await Course.create({ title, description });
    res.status(201).json({ message: 'Course created', course });
  } catch (err) {
    res.status(500).json({ message: 'Error creating course' });
  }
};

// View All
const getAllCourses = async (req, res) => {
  const courses = await Course.find().populate('studentsEnrolled', 'name email');
  res.json(courses);
};

// View by ID
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('studentsEnrolled', 'name email');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Error getting course' });
  }
};

// Update
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course updated', course });
  } catch (err) {
    res.status(500).json({ message: 'Error updating course' });
  }
};

// Delete
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting course' });
  }
};


const assignCourseToStudent = async (req, res) => {
  const { courseId, studentId } = req.params;

  try {
    const student = await User.findById(studentId);
    if (!student || student.role !== 'student') {
      return res.status(404).json({ message: 'Student not found' });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    
    if (course.studentsEnrolled.includes(studentId)) {
      return res.status(400).json({ message: 'Student already enrolled' });
    }

    course.studentsEnrolled.push(studentId);
    await course.save();

    res.json({ message: 'Course assigned to student', course });
  } catch (err) {
    res.status(500).json({ message: 'Assignment failed' });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  assignCourseToStudent
};
