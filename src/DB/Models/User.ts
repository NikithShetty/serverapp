import { Sequelize } from "sequelize";

export function initUserModel (sequelize:Sequelize) {
  const Sequelize = sequelize.Sequelize;
  const User = sequelize.define('User', {
    id: {
      type: Sequelize.UUID
      , primaryKey: true
      , defaultValue: Sequelize.UUIDV4
    }
    , name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  User.sync()
    .then(() => { 
      console.log("User model synced") ;
      return User;
    })
    .catch(() => {
      console.log("User model sync failed. EXiting...");
      process.exit(0)
    });
}

export interface User {
  id?: String
  , name?: String
  , email: String
}