const Progress = require('../models/Progress');
const User = require('../models/User');
const Course = require('../models/Course');

// Add or update progress
const setProgress = async (req, res) => {
  
  const studentId = req.params.studentId.trim();
  const courseId = req.params.courseId.trim();
  const { progressPercentage, notes } = req.body;

  try {
    // Check student
    const student = await User.findById(studentId);
    if (!student || student.role !== 'student') {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check course
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Check if already has progress
    let progress = await Progress.findOne({ student: studentId, course: courseId });

    if (progress) {
      // Update
      progress.progressPercentage = progressPercentage;
      progress.notes = notes;
      await progress.save();
      return res.json({ message: 'Progress updated', progress });
    } else {
      // Create
      const newProgress = await Progress.create({
        student: studentId,
        course: courseId,
        progressPercentage,
        notes
      });
      return res.status(201).json({ message: 'Progress created', progress: newProgress });
    }

  } catch (err) {
    console.error('Progress update error:', err);
    res.status(500).json({ message: 'Failed to update progress', error: err.message });
  }
};

// View all progress of a student
const getProgressByStudent = async (req, res) => {
  const { studentId } = req.params;
  const user = req.user;

  // Only admin or the same student can view progress
  if (user.role !== 'admin' && user.userId !== studentId) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const progress = await Progress.find({ student: studentId.trim() })
      .populate('course', 'title')
      .select('-student');

    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get progress', error: err.message });
  }
};

module.exports = {
  setProgress,
  getProgressByStudent
};