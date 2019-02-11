import errorHandler from "errorhandler";
import app from "./app";
import { db } from "./DB/sequelize";
import { logger } from "./Utils/Common";

/**
 * Initialize the services and 
 * Start Express server.
 */
const startServer = () => {
    /**
     * Error Handler. Provides full stack - remove for production
     */
    app.use(errorHandler());
    app.listen(app.get("port"), () => {
        logger(">> App is running at http://localhost:" + app.get("port") + " in " + app.get("env") + " mode");
        logger(">> Press CTRL-C to stop\n");
    });
}

const preInit = async () => {
    await db.sequelize.authenticate()
    logger('Connection to DB successful')
    await db.sequelize.sync()
    logger("DB sync successful")
}

preInit()
    .then(startServer)
    .catch((err: any) => {
        console.error('Error occured in Preinit: ', err);
        process.exit(1)
    });