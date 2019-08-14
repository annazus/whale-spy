import connectToDB from "./database";
import graphQLServerStart from "./server";
import { pubsub } from "./resolvers/SubscriptionTypes";
connectToDB(false).then(db => {
  graphQLServerStart(db, pubsub);
});
