import ErrorHandler from "../utils/errorhandler.js";
import asyncCatch from "../middleware/catchAsync.js";
import User from "../models/userModel.js";
import sendToken from "../utils/jwtcreater.js";
import sendMail from "../utils/sendMail.js";
import crypto from 'crypto';


//Register a User
const registerUser = asyncCatch( async (req, res, next) => {
    const {name, email, password} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "sample id",
            url: "profilepic.sample.url"
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

    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save();

    sendToken(user, 200, res);
});

export {registerUser, Login, Logout, forgotpass, resetpass};