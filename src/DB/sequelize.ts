import { DB, DB_USERNAME, DB_PASSWORD, DB_HOST } from "../Config";
import { initUserModel } from "./Models/User";

const Sequelize = require('sequelize');
export const sequelize = new Sequelize(DB, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',

    // To create a pool of connections
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

sequelize.Sequelize = Sequelize;
sequelize.User = initUserModel(sequelize);