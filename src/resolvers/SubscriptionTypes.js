import { PubSub } from "graphql-subscriptions";

export const SIGHTING_ADDED = "SIGHTING_ADDED";
export const SIGHTING_UPDATED = "SIGHTING_UPDATED";
export const SIGHTING_DELETED = "SIGHTING_DELETED";
export const COMMENT_ADDED = "COMMENT_ADDED";

export const pubsub = new PubSub();
