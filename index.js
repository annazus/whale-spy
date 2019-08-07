import connectToDB from "./database";
import graphQLServerStart from "./server";

connectToDB(false).then(db => {
  graphQLServerStart(db);
});
