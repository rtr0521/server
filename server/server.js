const express = require("express");
const dbConnect = require("./model/dbConnect");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// Connect to the database
dbConnect();

// Enable CORS
app.use(cors());

// Set up middleware to parse request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* // Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Change this to your email service
    auth: {
        user: 'danieldetorres30@gmail.com',
        pass: 'utzk aldc xagx xitv',
    },
});

// Forget password route
app.post('/forget-password', async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the email exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a password reset token and set expiration time (e.g., 1 hour)
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiry = Date.now() + 60 * 60 * 1000; // 1 hour from now

        // Save the token and expiry time to the user object
        user.resetToken = resetToken;
        user.resetTokenExpiry = resetTokenExpiry;
        await user.save();

        // Create the password reset link
        const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
            
        // Configure mail options
        const mailOptions = {
            name: "Cordova CRUD",
            from: "danieldetorres30@gmail.com",
            to: email,
            subject: 'Password Reset',
            html: `
                <p>Click the link to reset your password:</p>   
                <a href="${resetLink}">${resetLink}</a>
            `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Reset password route
app.post('/reset-password/:token', async (req, res) => {
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

        // Update the user's password and clear the reset token and expiry
        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpiry = null;

        // Save the updated user object to the database
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // The token is expected to be in the format "Bearer TOKEN"

    if (token == null) {
        return res.status(401).json({ message: 'Missing token' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = user;
        next(); // Continue with the next middleware or route handler
    });
}

app.get('/protected-route', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route!' });
});


// Signup route
app.post('/signup', async (req, res) => {
    console.log('Received data:', req.body); // Log the received data
    try {
        const { fullname, email, username, password } = req.body;

        // Check if a user with the same email or username already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });

        if (existingUser) {
            console.log('Existing user:', existingUser); // Log the existing user data
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with hashed password
        const newUser = new User({ fullname, email, username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
 */

app.get("/", (req, res) => {
    res.send("Welcome to the server");
});
/* // Login route
app.post('/login', async (req, res) => {
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
});
 */
// Import the authRoutes module
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

// Use the authRoutes
app.use("/admin", adminRoutes);
app.use(userRoutes);

/* //Login Admin Auth Route
app.post('/auth/login', async (req, res) => {
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
}); */


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
