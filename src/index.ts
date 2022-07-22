import "./lib/db";
import express from "express";
import akumaNoMiRoutes from "./routes/akumaNoMi.routes";
import authRoutes from "./routes/auth.routes";
import morgan from "morgan";
import passport from "passport";
import passportMiddleware from "./middleware/passport";

const app = express();
const port = process.env.PORT || 3333;


//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

// routes
app.get("/", async (req, res) => {
  res.json({ message: "Please visit /countries to view all the countries" });
});
app.use("/akuma-no-mi", akumaNoMiRoutes);
app.use("/auth", authRoutes);

// server up
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
