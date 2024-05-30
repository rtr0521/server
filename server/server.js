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

app.use('/uploads', express.static('uploads')); // Serve uploaded files

app.get("/", (req, res) => {
    res.send("Welcome to the server");
});

// Import the authRoutes module
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

// Use the authRoutes
app.use("/admin", adminRoutes);
app.use(userRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
