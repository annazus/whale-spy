import {
  SIGHTING_ADDED,
  SIGHTING_DELETED,
  SIGHTING_UPDATED,
  COMMENT_ADDED,
  pubsub
} from "./SubscriptionTypes";
import { withFilter } from "apollo-server";
const Subscription = {
  sightingAdded: {
    subscribe: () => pubsub.asyncIterator(SIGHTING_ADDED)
  },
  sightingDeleted: {
    subscribe: () => pubsub.asyncIterator(SIGHTING_DELETED)
  },
  sightingUpdated: {
    subscribe: () => pubsub.asyncIterator(SIGHTING_UPDATED)
  },
  commentAdded: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(COMMENT_ADDED),
      (payload, variables) => {
        return payload.commentAdded.sightingId === variables.sightingId;
      }
    )
  }
};
export default Subscription;
