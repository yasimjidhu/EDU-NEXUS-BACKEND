import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import cors from "cors";
import cookieParser from "cookie-parser";
import axios from "axios";

const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

axios.defaults.withCredentials = true;

// app.use((req, res, next) => {
//   res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
//   next();
// });

app.use("/auth", authRoutes);

app.listen(4000, () => {
  console.log("Api gateway running on port 4000");
});
