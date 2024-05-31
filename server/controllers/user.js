const User = require('../model/users/userModel'); // Import your AuthUser model
const UserActivities = require('../model/users/userActivity'); // Import your userActivity model
const Task = require('../model/users/Task');

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key'; // Make sure to keep this secret key secure

exports.updateTaskStatus = async (req, res) => {
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

exports.getActivityById = async (req, res) => {
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

// Get all tasks for a specific activity
exports.getAllTasksForActivity = async (req, res) => {
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
exports.addTask = async (req, res) => {
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
exports.updateTask = async (req, res) => {
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
exports.deleteTask = async (req, res) => {
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

// User Activities
exports.getAllActivities = async (req, res) => {
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


exports.createActivity = async (req, res) => {
  try {
    const activity = new UserActivities(req.body);
    await activity.save();
    res.status(201).send(activity);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateActivity = async (req, res) => {
  try {
    const activity = await UserActivities.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(activity);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteActivity = async (req, res) => {
  try {
    await UserActivities.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

// Function to handle login
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create a token (e.g., JWT) and send it to the client
        const token = jwt.sign({ id: user._id, username: user.username }, secretKey, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



// Emailling Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'danieldetorres30@gmail.com',
        pass: 'utzk aldc xagx xitv',
    },
});

// Forget password controller
exports.forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a reset token and expiration time (1 hour)
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiry = Date.now() + 60 * 60 * 1000; // 1 hour from now

        // Save token and expiry time to the user object
        user.resetToken = resetToken;
        user.resetTokenExpiry = resetTokenExpiry;
        await user.save();

        // Create password reset link
        const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

        // Set mail options
        const mailOptions = {
            name: "ResearchHub",
            from: 'danieldetorres30@gmail.com',
            to: email,
            subject: 'Password Reset',
            html: `
                <p>Click the link to reset your password:</p>
                <a href="${resetLink}">${resetLink}</a>
            `,
        };

        // Send email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Reset password controller
exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        // Find the user with the given reset token
        const user = await User.findOne({ resetToken: token });
        if (!user) {
            return res.status(404).json({ message: 'Invalid or expired token' });
        }

        // Check if the token is expired
        if (user.resetTokenExpiry < Date.now()) {
            return res.status(400).json({ message: 'Token has expired' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password, clear token and expiry time
        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpiry = null;

        // Save updated user to the database
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.signup = async (req, res) => {
  try {
      const { fullname, email, username, password } = req.body;
      
      // Check if a file is uploaded and assign its path to profilePicture variable
      const profilePicture = req.file ? req.file.path : null;

      // Check if user with the same email or username already exists
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });

      if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password before saving to database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user object with provided details
      const newUser = new User({
          fullname,
          email,
          username,
          password: hashedPassword,
          profilePicture // Assign profile picture path
      });

      // Save the new user to the database
      await newUser.save();

      // Respond with success message
      res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
      // Handle any errors
      console.error('Error signing up:', error);
      res.status(500).json({ message: 'Server error' });
  }
};

/* exports.getUserProfile = async (req, res) => {
  try {
    console.log(`Fetching user profile for ID: ${req.params.id}`);
    const user = await User.findById(req.params.id);

    if (!user) {
      console.log(`User not found for ID: ${req.params.id}`);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(`User found: ${user}`);
    res.json({
      fullname: user.fullname,
      email: user.email,
      // other properties
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; */


exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Expecting format "Bearer TOKEN"

    if (token == null) {
        return res.status(401).json({ message: 'Missing token' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = user;
        next(); // Proceed to the next middleware or route handler
    });
};

exports.getStatusData = async (req, res) => {
  try {
    const statusCounts = await UserActivities.aggregate([
      { 
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    // Initialize counts for all statuses
    const initialCounts = {
      Todo: 0,
      Ongoing: 0,
      Done: 0
    };

    // Update the counts with actual values from the database
    statusCounts.forEach(item => {
      initialCounts[item._id] = item.count;
    });

    // Calculate the total number of activities
    const totalActivities = Object.values(initialCounts).reduce((acc, count) => acc + count, 0);

    // Calculate percentages for each status
    const labels = Object.keys(initialCounts);
    const values = Object.values(initialCounts).map(count => ((count / totalActivities) * 100).toFixed(2));

    const responseData = {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: ['#f39c12', '#00aba9', '#2ecc71'] // Adjust colors as needed
        },
      ],
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error fetching status data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};