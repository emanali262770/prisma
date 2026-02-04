import express from "express";
import { connectDb } from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',userRoute)
app.use('/api',postRoute)
connectDb();

app.get("/", (req, res) => {
  res.send("Server running with Prisma 6 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
