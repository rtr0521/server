const User = require('../model/users/userModel'); // Import your AuthUser model
const UserActivities = require('../model/users/userActivity'); // Import your userActivity model

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key'; // Make sure to keep this secret key secure

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
        res.status(500).json({ message: err.message });x
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

// authController.js


// Configure nodemailer
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

// Signup controller
exports.signup = async (req, res) => {
    try {
        const { fullname, email, username, password } = req.body;

        // Check if a user with the same email or username already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ fullname, email, username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

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

