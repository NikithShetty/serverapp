import { DB, DB_USERNAME, DB_PASSWORD, DB_HOST } from "../Config";
import fs from 'fs';
import path from 'path'
import Sequelize from "sequelize";

var basename = path.basename(__filename);
const database:any = {}

const sequelize = new Sequelize(DB, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',

    // To create a pool of connections
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

fs.readdirSync(__dirname + "/Models/")
    .filter(file => {
        return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
    })
    .forEach(file => {
        var model = sequelize["import"](path.join(__dirname, "Models", file));
        database[model.name] = model;
    });

Object.keys(database).forEach(modelName => {
    if (database[modelName].associate) {
        database[modelName].associate(database);
        database[modelName].sync();
    }
});

database.sequelize = sequelize;
database.Sequelize = Sequelize;

export const db = database;