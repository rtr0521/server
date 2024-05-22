const mongoose = require("mongoose");

const Auth_AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"]
    },
});

module.exports = mongoose.model("Auth_Admin", Auth_AdminSchema);
