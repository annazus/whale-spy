import {
  PIN_ADDED,
  PIN_DELETED,
  PIN_UPDATED,
  COMMENT_ADDED,
  pubsub
} from "./SubscriptionTypes";
import { withFilter } from "apollo-server";
const Subscription = {
  pinAdded: {
    subscribe: () => pubsub.asyncIterator(PIN_ADDED)
  },
  pinDeleted: {
    subscribe: () => pubsub.asyncIterator(PIN_DELETED)
  },
  pinUpdated: {
    subscribe: () => pubsub.asyncIterator(PIN_UPDATED)
  },
  commentAdded: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(COMMENT_ADDED),
      (payload, variables) => {
        return payload.commentAdded.pinId === variables.pinId;
      }
    )
  }
};
export default Subscription;
