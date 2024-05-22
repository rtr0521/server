const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email already exists"] // Specify custom error message
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"]
    },
    // Add resetToken and resetTokenExpiry fields for password reset functionality
    resetToken: {
        type: String,
        default: null
    },
    resetTokenExpiry: {
        type: Date,
        default: null
    },
});

module.exports = mongoose.model("User", UserSchema);
