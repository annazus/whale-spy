import Sequelize from "sequelize";
import * as definitions from "./models";

const connection = new Sequelize(process.env.POSTGRES_URI, {
  dialect: "postgres",
  logging: true,
  dialectOptions: {
    ssl: true
  }
});

connection
  .authenticate()
  .then(() => console.log("Connection to database successful"))
  .catch(err => console.log("Unable to connect to the database:", err));

let db = {};

connection.sync({ force: true });

Object.keys(definitions).forEach(element => {
  db[element] = definitions[element](connection);
});
Object.keys(definitions).forEach(element => {
  if (db[element].associate) db[element].associate(db);
});

export default db;
