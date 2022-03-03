import ErrorHandler from "../utils/errorhandler.js";

const errhandle = (err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //request for invalid resource
    if(err.name === "CastError"){
        const message = `Resource not found. Invalid : ${err.path}`; 
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success : false,
        error : err,
        message : err.message
    })
};

export default errhandle;