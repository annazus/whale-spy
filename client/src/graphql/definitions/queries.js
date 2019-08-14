import { gql } from "apollo-boost";

export const QUERY_ME = gql`
  query Me {
    me {
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

export const QUERY_PINS = gql`
  query Pins {
    pins {
      id
      title
      content
      latitude
      longitude
      dateSpotted
      image
      author {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`;
