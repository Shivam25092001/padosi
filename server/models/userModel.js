import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter your name"],
        maxlength: [40, "Name should not exceed more than 40 charecters"],
        minlength: [4, "Name cannot be smaller than 4 charecters"]
    },
    email:{
        type: String,
        required: [true, "Please enter your email ID"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email address" ]
    },
    password: {
        type: String,
        required: [true, "Please Enter your password"],
        minlength: [8, "Password cannot be smaller than 8 charecetrs"],
        select: false,
    },
    address: {
        address: {
            type : String,
            required: false
        },
        city: {
            type : String,
            required: false
        },
        state: {
            type : String,
            required: false,
        },
        country: {
            type : String,
            required: false
        },
        pinCode: {
            type: String,
            required: false
        },
        phoneNumber: {
            type: String,
        }
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


//Encrypting the password before it gets saved to the db
userSchema.pre("save", async function(next){
    //in-case of update & no password change - (to prevent password re-hashing)
    if(!this.isModified("password")){
        next();
    }

    this.password  = await bcrypt.hash(this.password, 10);
});


//JWT Token
userSchema.methods.getJWT = function(){

    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });
}


//Password Check
userSchema.methods.comparePassword = async function(inputPassword){
    
    return await bcrypt.compare(inputPassword, this.password);
}


//Generating Password reset token
userSchema.methods.getResetPassToken = function(){

    //generating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //hashing & adding resetToken to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15*60*1000;

    return resetToken;
};

export default mongoose.model('User', userSchema);