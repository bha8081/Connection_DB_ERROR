const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "User name is required."],
        minLength: [3, "Name must be at least 3 char"],
        maxLength: [30, "Name must be less then 30 char"],
        trim: true

    },
    email: {
        type: String,
        required: [true, "User email is required"],
        unique: true,
        lowercase: true,
        unique: [true, "already registered"]
    },
    password: {
        type: String,
        Select: false
    },
    forgotPasswordToken: {
        type: String
    },
    forPasswordExpiryDate: {
        type: Date
    }
}, {
    timestamps: true
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;