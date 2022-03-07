import ErrorHandler from "../utils/errorhandler.js";
import asyncCatch from "../middleware/catchAsync.js";
import User from "../models/userModel.js";
import sendToken from "../utils/jwtcreater.js";


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

export {registerUser, Login, Logout};