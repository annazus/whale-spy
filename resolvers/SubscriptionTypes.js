import { PubSub } from "graphql-subscriptions";

export const PIN_ADDED = "PIN_ADDED";
export const PIN_UPDATED = "PIN_UPDATED";
export const PIN_DELETED = "PIN_DELETED";
export const COMMENT_ADDED = "COMMENT_ADDED";

export const pubsub = new PubSub();
