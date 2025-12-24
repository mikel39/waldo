import express from "express";
import index from "./routes/index";
import path from "path";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*",
  }),
);
app.use("/static", express.static(path.join(__dirname, "../src/assets")));
app.use(express.urlencoded({ extended: true }));

app.use("/api", index);

app.listen(8000, (err) => {
  if (err) return console.log(err);
  console.log("App initiated.");
});
