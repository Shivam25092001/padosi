import ErrorHandler from "../utils/errorhandler.js";
import asyncCatch from "../middleware/catchAsync.js";
import User from "../models/userModel.js";


//Register a User
export default registerUser = asyncCatch( async (req, res, next) => {
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

    res.status(201).json({
        success:true,
        user
    });
});