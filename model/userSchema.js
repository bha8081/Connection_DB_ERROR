const mongoose = require('mongoose');
const { Schema } = mongoose;
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

// Password encrypt code.
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    return next();
})

userSchema.methods = {
    jwtToken() {
        return JWT.sign(
            {id: this._id, email: this.email},
            process.env.SECRET,
            { expiresIn: '24h' }
        )
    }

}

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;