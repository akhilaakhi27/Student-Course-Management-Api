const express = require('express');
const router = express.Router();
const { setProgress, getProgressByStudent } = require('../controllers/progressController');
const protect = require('../middlewares/authMiddleware');

// Admin: create/update student progress
router.post('/:studentId/:courseId', protect(['admin']), setProgress);

// Admin and the same student can view progress
router.get('/:studentId', protect(), getProgressByStudent);

module.exports = router;