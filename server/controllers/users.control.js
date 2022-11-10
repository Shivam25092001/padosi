import ErrorHandler from "../utils/errorhandler.js";
import asyncCatch from "../middleware/catchAsync.js";
import User from "../models/userModel.js";
import sendToken from "../utils/jwtcreater.js";
import sendMail from "../utils/sendMail.js";
import crypto from 'crypto';
import cloudinary from "cloudinary";


//Register a User
const registerUser = asyncCatch( async (req, res, next) => {

    const cloudImage = await cloudinary.v2.uploader.upload(
        req.body.avatar,
        { 
            folder: "padosi-user-avatars",
            width: 150,
            crop: "scale",
        }
    );


    const {name, email, password} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: cloudImage.public_id,
            url: cloudImage.secure_url
        },
    });

    sendToken(user, 201, res);
});


//Login User
const Login = asyncCatch( async (req, res, next)=>{
    const {email, password} = req.body;

    //Checking if user has provided complete credentials
    if(! (email || password)){
        return next(new ErrorHandler("Please enter email & password", 400));
    }

    //Verifying email & password
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Email ID or Password incorrect", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){

        return next(new ErrorHandler("Email ID or Password incorrect", 401));
    }

    sendToken(user, 200, res);
});


//Logout User
const Logout = asyncCatch( async (req, res, next) => {

    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: "Logged Out successfully"
    });
} );

// Forgot Password
const forgotpass = asyncCatch(async(req, res, next) => {
    const user = await User.findOne({ email: req.body.email});

    if(!user){
        return next(new ErrorHandler("User not found", 404));
    }

    //Get Password reset token
    const resetToken = user.getResetPassToken();

    await user.save({validateBeforeSave: false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- 
    \n\n ${resetPasswordUrl}
    \n If not requested for this mail, please ignore.`;

    try {
        await sendMail({
            email: user.email,
            subject: `Padosi ID Password Recovery`,
            message
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave: false});

        return next(new ErrorHandler(error.message, 500));
    }
});

//Reset Password
const resetpass = asyncCatch(async(req, res, next) => {
    console.log("reset pass");
    //hashing resetToken & comparing 
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken : resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if(!user){
        return next(new ErrorHandler("Reset password token is invalid or has expired.", 400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password & Confirm Password didn't match.", 400));
    }
    console.log(req.body.password)
    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save();

    sendToken(user, 200, res);
});

//Get user details
const getUserDetails = asyncCatch(async (req, res, next) => {

    const user = await User.findById(req.user.id);
  
    if(!user){
      return next(new ErrorHandler("User not found", 404));
    }
  
    return res.status(200).json({
      success: true,
      user
    })
});

//update user password
const updatePassword = asyncCatch(async (req, res, next) => {

    const user = await User.findById(req.user.id).select("+password");
  
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){

        return next(new ErrorHandler("Old Password incorrect", 400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){

        return next(new ErrorHandler("New Password & Confirm Password didn't match.", 400));
    }

    user.password = req.body.newPassword;
    await user.save();
  
    sendToken(user, 200, res);
});

//update user profile
const updateProfile = asyncCatch(async (req, res, next) => {
    
    const newUserData = {
        name : req.body.name,
        email : req.body.email,
        address : JSON.parse(req.body.address)
    }
    
    if(req.body.avatar !== undefined && req.body.avatar !== ""){
        const user = await User.findById(req.user.id);
        const imageID = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageID);

        const cloudImage = await cloudinary.v2.uploader.upload(
            req.body.avatar,
            { 
                folder: "padosi-user-avatars",
                width: 300,
                crop: "scale",
            }
        );

        newUserData.avatar = {
            public_id: cloudImage.public_id,
            url: cloudImage.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        user
    });
});


//Get all users (admin)
const getUsers = asyncCatch( async(req, res, next) => {

    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    });
});

//Get single users (admin)
const getSingleUser = asyncCatch( async(req, res, next) => {

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler("User does not exist", 404));
    }

    res.status(200).json({
        success: true,
        user
    });
});

//update user role (admin)
const updateRole = asyncCatch(async (req, res, next) => {
    
    const newUserData = {
        email : req.body.email,
        role: req.body.role,
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
    });
});

//Delete user (admin)
const deleteUser = asyncCatch(async (req, res, next) => {
    
    //Remove cloudinary data for avatar
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User doesnot exist with id : ${req.params.id}`, 404));
    }

    await user.remove();

    res.status(200).json({
        success: true,
    });
});


export {registerUser, Login, Logout, forgotpass, 
    resetpass, getUserDetails, updatePassword, updateProfile,
    getUsers, getSingleUser, updateRole, deleteUser,
};