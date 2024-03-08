const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        minlength: 3,
        maxlength: 30
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [6, "Minimum length should be 6 characters"]
    },

    firstName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },

    lastName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;