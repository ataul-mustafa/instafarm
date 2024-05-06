const mongoose = require('mongoose');

const emailValidator = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
}

const userSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "Name is too short"],
        maxLength: [15, "Name is too long"] 
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: [true, "Email is already registered"],
        validate: [emailValidator, "Please Enter a valid email"]
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minLength: [6, "Password must contain atleast 6 characters"]
    },
    userType: {
        type: String,
        enum: ["user", "admin"],
    },
})

const User = mongoose.models.user || mongoose.model('user', userSchema);
module.exports = User;
