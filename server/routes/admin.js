const express = require('express');
const router = express.Router();
// Import the controller function

const adminController = require('../controllers/admin')

// Define the route and specify the controller function
router.post('/auth', adminController.login);

// Export the router Manage Activities
router.get('/adminActivities', adminController.getAllAdminActivities);
router.post('/adminActivities', adminController.createAdminActivity);
router.put('/adminActivities/:id', adminController.deleteAdminActivity);
router.delete('/adminActivities/:id', adminController.deleteAdminActivity);
router.delete('/adminActivities', adminController.bulkDeleteAdminActivities);

router.get('/adminActivities/:id', adminController.getAdminActivityById);
// Data Analytics

router.get('/activities/total', adminController.getTotalActivities); // Define a route for /api/activities/total
router.get('/task/TotalTasks', adminController.getTotalTask);

/* Get ID to All Data */
router.put('/adminActivities/:id/description', adminController.updateAdminActivitiesTask)
router.get('/adminActivities/:id', adminController.getAdminActivityById);
router.get('/adminActivities/:id/tasks', adminController.getAdminAllTasksForActivity);
router.post('/adminActivities/:id/tasks', adminController.getAdminAddTask);
router.put('/adminActivities/:id', adminController.getAdminUpdateTask);
router.delete('/adminActivities/:id', adminController.getAdminDeleteTask);
router.put('/adminActivities/status/:id', adminController.getAdminUpdateTaskStatus);

module.exports = router;
