import { gql } from "apollo-boost";

export const SIGHTING_ADDED_SUBSCRIPTION = gql`
  subscription SightingAdded {
    sightingAdded {
      id
      latitude
      longitude
      dateSpotted
      countYoung
      countAdultS
      species
      content
      direction
      vocalizing
      activity
      observerInteraction
      observerDistance
      observerLocation
      image {
        id
        url
        isHero
      }
      author {
        id
        name
        picture
      }
      createdAt
      updatedAt
    }
  }
`;
export const SIGHTING_UPDATED_SUBSCRIPTION = gql`
  subscription SightingUpdated {
    sightingUpdated {
      id
      latitude
      longitude
      dateSpotted
      countYoung
      countAdultS
      species
      content
      direction
      vocalizing
      activity
      observerInteraction
      observerDistance
      observerLocation
      image {
        id
        url
        isHero
      }
      author {
        id
        name
        picture
      }
      createdAt
      updatedAt
    }
  }
`;
export const SIGHTING_DELETED_SUBSCRIPTION = gql`
  subscription SightingDeleted {
    sightingDeleted {
      id
    }
  }
`;
export const COMMENT_ADDED_SUBSCRIPTION = gql`
  subscription CommentAdded($sightingId: ID!) {
    commentAdded(sightingId: $sightingId) {
      text
      createdAt
      author {
        name
        picture
      }
      sighting {
        id
      }
    }
  }
`;
