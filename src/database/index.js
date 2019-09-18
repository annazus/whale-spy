import Sequelize from "sequelize";
import * as definitions from "./models";
let connection;
const connectToDB = async force => {
  connection = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: true
    }
  });
  connection
    .authenticate()
    .then(() => {
      console.log("Connection to database successful");
    })
    .catch(err => console.log("Unable to connect to the database:", err));

  let db = {};

  Object.keys(definitions).forEach(element => {
    db[element] = definitions[element](connection);
  });
  Object.keys(definitions).forEach(element => {
    if (db[element].associate) db[element].associate(db);
  });
  await connection.sync({ force });

  return db;
};

export const closeDB = async () => {
  if (!connection) return;
  await connection.close();
};

export default connectToDB;
