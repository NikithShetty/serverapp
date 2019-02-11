import express from "express";
import bodyParser from "body-parser";
import { PORT } from "./Config";
import { userRouter } from "./Routes/User";

// Create Express server
const app = express();

app.set("port", PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Primary app routes.
 */
app.get("/", (req, res, next) => {
    res.send("Hello");
    next()
});

app.use('/', userRouter)

export default app;