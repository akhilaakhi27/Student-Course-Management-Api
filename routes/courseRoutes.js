const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  assignCourseToStudent
} = require('../controllers/courseController');


router.post('/', protect(['admin']), createCourse);
router.get('/', protect(['admin']), getAllCourses);
router.get('/:id', protect(['admin']), getCourseById);
router.put('/:id', protect(['admin']), updateCourse);
router.delete('/:id', protect(['admin']), deleteCourse);
router.post('/:courseId/assign/:studentId', protect(['admin']), assignCourseToStudent);

module.exports = router;
