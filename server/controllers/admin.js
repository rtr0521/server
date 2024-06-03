const AuthAdmin = require('../model/admin/adminAuth'); // Import your AuthAdmin model
const UserActivities = require('../model/users/userActivity'); // Import your userActivity model
const Task = require('../model/users/Task'); // Import the Task model
const User = require('../model/users/userModel')

// Function to handle login
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const adminAuth = await AuthAdmin.findOne({ username });
        if (!adminAuth) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check password (direct comparison)
        if (password !== adminAuth.password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Data Analytics
exports.getTotalActivities = async (req, res) => {
  try {
    const totalActivities = await UserActivities.countDocuments();
    const totalProjects = await UserActivities.distinct('name').length; // Assuming each project has a unique name

    res.json({ totalActivities, totalProjects });
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Total Task Progress and Done
exports.getTotalTask = async (req, res) => {
    try {
      const totalOnProgress = await Task.countDocuments({ status: 'inProgress' });
      const totalDone = await Task.countDocuments({ status: 'done' });
  
      res.json({ totalOnProgress, totalDone });
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

 // Pie Chart
 exports.getAdminPieChart = async (req, res) => {
  try {
    const todoCount = await Task.countDocuments({ status: 'todo' });
    const inProgressCount = await Task.countDocuments({ status: 'inProgress' });
    const doneCount = await Task.countDocuments({ status: 'done' });

    res.json({
      todo: todoCount,
      inProgress: inProgressCount,
      done: doneCount
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch task statistics' });
  }
};


// Top Activities
exports.getDuplicateActivities = async (req, res) => {
  try {
    const duplicateActivities = await UserActivities.aggregate([
      {
        $group: {
          _id: "$name",
          count: { $sum: 1 }
        }
      },
      {
        $match: {
          count: { $gt: 1 } // Filter for activities with more than one occurrence
        }
      },
      {
        $sort: { count: -1 } // Sort by count in descending order
      },
      {
        $limit: 10 // Limit to top 5
      },
      {
        $project: {
          name: "$_id",
          count: 1,
          _id: 0
        }
      }
    ]);

    res.json(duplicateActivities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Line Graph
exports.getAdminLineGraphTask =async (req, res) => {
  try {
    const tasks = await Task.find().populate('activity');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
  
// User Activities
exports.getAllAdminActivities = async (req, res) => {
    try {
        const search = req.query.search || '';
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
    
        const query = {
          name: { $regex: search, $options: 'i' }
        };
    
        const activities = await UserActivities.find(query)
          .skip((page - 1) * limit)
          .limit(limit);
    
        const totalActivities = await UserActivities.countDocuments(query);
    
        res.json({
          activities,
          totalActivities,
          totalPages: Math.ceil(totalActivities / limit),
          currentPage: page
        });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
};


exports.createAdminActivity = async (req, res) => {
  try {
    const activity = new UserActivities(req.body);
    await activity.save();
    res.status(201).send(activity);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteAdminActivity = async (req, res) => {
  try {
    const activity = await UserActivities.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(activity);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteAdminActivity = async (req, res) => {
  try {
    await UserActivities.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

// PUT request to update description of an activity
exports.updateAdminActivitiesTask =  async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
  
    try {
      const activity = await UserActivities.findById(id);
      if (!activity) {
        return res.status(404).json({ error: 'Activity not found' });
      }
  
      activity.description = description;
      await activity.save();
  
      res.status(200).json(activity);
    } catch (error) {
      console.error('Error updating description:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

exports.getAdminActivityById = async (req, res) => {
  try {
    const activities = await UserActivities.findById(req.params.id);
    if (!activities) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.bulkDeleteAdminActivities = async (req, res) => {
    const { ids } = req.body;
    try {
      await UserActivities.deleteMany({ _id: { $in: ids } });
      res.status(204).send();
    } catch (error) {
      res.status(500).send(error);
    }
  };

exports.getAdminUpdateTaskStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
  /*     console.log(`Received request to update task ${id} to status ${status}`); */
  
      const updatedTask = await Task.findByIdAndUpdate(id, { status }, { new: true });
  
      if (!updatedTask) {
        console.log(`Task ${id} not found`);
        return res.status(404).json({ message: 'Task not found' });
      }
  /* 
      console.log(`Task ${id} updated successfully to status ${status}`); */
      res.status(200).json(updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Get all tasks for a specific activity
  exports.getAdminAllTasksForActivity = async (req, res) => {
    try {
      const { id } = req.params;
      const tasks = await Task.find({ activity: id });
      res.json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Add a new task to an activity
  exports.getAdminAddTask = async (req, res) => {
    try {
      const { description } = req.body;
      const activityId = req.params.id;
  
      const newTask = new Task({
        description,
        activity: activityId
      });
  
      await newTask.save();
  
      res.status(201).json({ message: 'Task added successfully', newTask });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  // Update task description by ID
  exports.getAdminUpdateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const updatedTask = await Task.findByIdAndUpdate(id, { description }, { new: true });
      if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
      res.status(200).json(updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Delete Task
  exports.getAdminDeleteTask = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedTask = await Task.findByIdAndDelete(id);
  
      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
// User Details
exports.getAdminUsers = async (req, res) => {
  try {
      const users = await User.find();
      res.json(users);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

// Delete Users
exports.DeleteAdminUsers =  async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
      res.status(500).send({ message: 'Server error' });
  }
};

