import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter your name"],
        maxlength: [40, "Name should not exceed more than 40 charecters"],
        minlength: [4, "Name cannot be smaller than 4 charecters"]
    },
    email:{
        type: String,
        required: [true, "Please enter your name"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email address" ]
    },
    password: {
        type: String,
        required: [true, "Please Enter your password"],
        minlength: [8, "Password cannot be smaller than 8 charecetrs"],
        select: false,
    },
    avatar: {
            public_id: {
              type: String,
              required: true,
            },
            url: {
              type: String,
              required: true,
            },
    },
    role: {
        type: String,
        default: "user"
    },
    rating: {
        type: Number,
        default: 0,
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

export default mongoose.model('User', userSchema);