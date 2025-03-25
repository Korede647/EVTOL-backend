import express from "express";
import cors from "cors";
import evtolRoutes from "./routes/evtol.route";
import { checkBatteryLevel } from "./middleware/evtolBatteryLevel.middleware";
import { errorHandler } from "./utils/errorHandler.utils";
import medicRoutes from "./routes/medication.route";
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";

const portEnv = process.env.PORT
if(!portEnv){
    console.error("Error: PORT is not defined in .env file");
    process.exit(1);
}

const PORT:number = parseInt(portEnv, 10);
if(isNaN(PORT)){
    console.error("Error: PORT is not a number in .env file");
    process.exit(1);
}

const app = express()
const corsOptions = {
    origin:
    "*",
    credentials: true,
    allowedHeaders: "*",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
}

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1/evtol", evtolRoutes)
app.use("/api/v1/medications", medicRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/auth", authRoutes)

app.use(errorHandler)

// setInterval(checkBatteryLevel, 400 * 60 * 100)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
});