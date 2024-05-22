const AuthAdmin = require('../model/admin/adminAuth'); // Import your AuthAdmin model

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
