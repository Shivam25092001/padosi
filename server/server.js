import express from "express"
import cors from "cors"
import errhandle from "./middleware/error.js";
import supplies from "./routes/supplies.route.js"


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", supplies);

//Middleware for errors
app.use(errhandle);

export default app;