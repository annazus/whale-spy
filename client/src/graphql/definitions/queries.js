import { gql } from "apollo-boost";

export const QUERY_ME = gql`
  query Me {
    me {
      id
      email
      picture
      name
    }
  }
`;

export const QUERY_COMMENTS = gql`
  query Comments($pinId: ID!) {
    comments(pinId: $pinId) {
      id
      text
      createdAt
      author {
        name
        picture
      }
    }
  }
`;

export const QUERY_SIGHTINGS = gql`
  query Sightings {
    sightings {
      id
      latitude
      longitude
      dateSpotted
      countYoung
      countAdults
      species
      content
      direction
      vocalizing
      activity
      interactionWithObservers
      observerDistance
      observerLocation
      images {
        id
        url
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
