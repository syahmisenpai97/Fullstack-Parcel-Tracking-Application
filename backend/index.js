import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import UserRoute from "./routes/ParcelRoute.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: "Too many requests, please try again later.",
  },
  headers: true,
});

app.use(cors());
app.use(express.json());
app.use(apiLimiter);
app.use(UserRoute);

app.listen(process.env.PORT, () => console.log("Server up and running..."));
