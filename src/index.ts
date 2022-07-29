import "./lib/db";
import express from "express";
import akumaNoMiRoutes from "./routes/akumaNoMi.routes";
import authRoutes from "./routes/auth.routes";
import morgan from "morgan";
import passport from "passport";
import passportMiddleware from "./middleware/passport";
import path from "path";

const app = express();
const port = process.env.PORT || 443;


//middleware
app.use(morgan("dev"));//muestra info http
app.use(express.json());//to parse json
app.use(passport.initialize());// to authenticate
passport.use(passportMiddleware);// authenticate config
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));
app.use("/uploads", express.static(path.resolve("uploads")));//to save images of akumaNoMi

// routes
app.get("/", async (req, res) => {
  res.json({ Menssage: {
    EN: "I'm Luffy! A man who will become a pirate king!",
    JP: "俺はルフィ！海賊王になる男だ！",
    RO: "Ore wa rufi! Kaizoku-ō ni naru otokoda!",
    ES: "!Soy Luffy! El Hombre que se convertira en el Rey de los Piratas!",
  } });
});
app.use("/akuma-no-mi", akumaNoMiRoutes);
app.use("/auth", authRoutes);

// server up
app.listen(port, () => {
  console.log(`app listening at PORT: ${port}`);
});
