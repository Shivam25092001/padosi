import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorhandler.js";
import asyncCatch from "./catchAsync.js";
import User from "../models/userModel.js";


const isUserAuthentic = asyncCatch( async (req, res, next) => {
    const { token } = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please login to complete this request", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET );

    req.user = await User.findById(decodedData.id);

    next();
});

export default isUserAuthentic;