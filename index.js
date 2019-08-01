import connectToDB from "./database";
import graphQLServerStart from "./server";

const db = connectToDB(false);
graphQLServerStart(db);
