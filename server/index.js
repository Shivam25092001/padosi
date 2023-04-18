import mongoose from "mongoose";
import app from "./server.js";
import dotenv from "dotenv";
if(process.env.NODE_ENV !== "PRODUCTION")
  dotenv.config();


import cloudinary from "cloudinary";
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

//Handling Uncaught Exception
process.on("uncaughtException", (err)=>{
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down server due to unhandeled uncaught exception`);
  process.exit(1);
});

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
 

mongoose
  .connect(process.env.DBCONNECTION_URL)
  .then((data) => {
    console.log(`MongoDB connected with server: ${data.connection.host}`);
  })
  .catch((error) => {
    console.log(`Error: ${error.message}`);
    console.log(`Shutting down server due to unhandeled promise Rejection`);

    server.close(() => {
      process.exit(1);
    });
  });
