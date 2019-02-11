module.exports = (sequelize:any, Sequelize:any) => {
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
  return User;
}

export interface User {
  id?: String
  , name?: String
  , email: String
}