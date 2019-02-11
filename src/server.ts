import errorHandler from "errorhandler";
import app from "./app";
import { db } from "./DB/sequelize";

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Initialize the services and 
 * Start Express server.
 */
const startServer = () => {
    app.listen(app.get("port"), () => {
        console.log(
            "  App is running at http://localhost:%d in %s mode",
            app.get("port"),
            app.get("env")
        );
        console.log("  Press CTRL-C to stop\n");
    });
}

const preInit = async () => {
    await db.sequelize.authenticate()
    console.log('Connection to DB successful.')
    await db.sequelize.sync()
    console.log("DB sync successful")
}

preInit()
    .then(startServer)
    .catch((err: any) => {
        console.error('Error occured in Preinit: ', err);
        process.exit(1)
    });