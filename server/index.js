import bodyParser from "body-parser";
import mongoose from "mongoose";
import app from "./server.js";
import dotenv from "dotenv";
dotenv.config();

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
