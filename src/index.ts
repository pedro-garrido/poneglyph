import "./lib/db";
import express from "express";
import akumaNoMiRoutes from "./routes/akumaNoMi.routes";
import authRoutes from "./routes/auth.routes";
import morgan from "morgan";



const app = express();
const port = process.env.PORT || 3333;


app.use(morgan("dev"));
app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

app.get("/", async (req, res) => {
  res.json({ message: "Please visit /countries to view all the countries" });
});

app.use("/akuma-no-mi", akumaNoMiRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
