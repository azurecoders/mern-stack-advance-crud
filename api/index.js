import express from "express";
import testRouter from "./routes/testing.route.js";

const app = express();

app.use("/api/test", testRouter);

app.listen(4000, () => console.log("Server is Working"));
