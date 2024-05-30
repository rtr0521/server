const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const upload = require('../middleware/upload'); // Import the Multer middleware

// Define routes and link them to controller functions
router.post('/login', userController.login);
router.post('/forget-password', userController.forgetPassword);
router.post('/reset-password/:token', userController.resetPassword);
router.post('/signup', upload.single('profilePicture'), userController.signup); // Use Multer middleware here
/* 
router.get('/profile/:id', userController.getUserProfile); */

// Define a protected route
router.get('/protected-route', userController.authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route!' });
});

// Export the router User Activities
router.get('/activities', userController.getAllActivities);
router.post('/activities', userController.createActivity);
router.put('/activities/:id', userController.updateActivity);
router.delete('/activities/:id', userController.deleteActivity);

/* Get ID to All Data */
router.get('/activities/:id', userController.getActivityById);
router.get('/activities/:id/tasks', userController.getAllTasksForActivity);
// Add new task to an activity
router.post('/activities/:id/tasks', userController.addTask);
router.put('/tasks/:id', userController.updateTask);
router.delete('/tasks/:id', userController.deleteTask);

// Update task status by ID
router.put('/tasks/status/:id', userController.updateTaskStatus);




// Export the router User Data Visualization Donut
router.get('/status-data', userController.getStatusData);

module.exports = router;
