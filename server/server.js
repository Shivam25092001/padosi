import express from "express"
import cors from "cors"
import errhandle from "./middleware/error.js";
import suppliesRoute from "./routes/supplies.route.js"
import usersRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";


const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", suppliesRoute);
app.use("/api/v1", usersRoute);

//Middleware for errors
app.use(errhandle);

export default app;