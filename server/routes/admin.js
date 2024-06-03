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


// Data Analytics
router.get('/adminActivities/:id', adminController.getAdminActivityById);
router.get('/activities/total', adminController.getTotalActivities); // Define a route for /api/activities/total
router.get('/task/TotalTasks', adminController.getTotalTask);
router.get('/task/PieSummary', adminController.getAdminPieChart);
router.get('/Task/LineGraph', adminController.getAdminLineGraphTask);
router.get('/activities/duplicates', adminController.getDuplicateActivities);


/* Get ID to All Data */
router.put('/adminActivities/:id/description', adminController.updateAdminActivitiesTask)
router.get('/adminActivities/:id', adminController.getAdminActivityById);
router.get('/adminActivities/:id/tasks', adminController.getAdminAllTasksForActivity);
router.post('/adminActivities/:id/tasks', adminController.getAdminAddTask);
router.put('/adminActivities/:id', adminController.getAdminUpdateTask);
router.delete('/adminActivities/:id', adminController.getAdminDeleteTask);
router.put('/adminActivities/status/:id', adminController.getAdminUpdateTaskStatus);

/* Details Users */
router.get('/adminUser/list', adminController.getAdminUsers);
router.delete('/adminUser/list/:id', adminController.DeleteAdminUsers);

module.exports = router;
