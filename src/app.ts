import express from "express";
import bodyParser from "body-parser";
import { PORT } from "./Config";
import { sequelize } from "./DB/sequelize";

//Connect to DB
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err: any) => {
        console.error('Unable to connect to the database:', err);
    });

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

export default app;