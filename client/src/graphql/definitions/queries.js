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
export const QUERY_PINS = gql`
  query Pins {
    pins {
      id
      image
      title
      content
      dateSpotted
      latitude
      longitude
      createdAt
      author {
        id
        name
      }
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
