import { gql } from "apollo-boost";

export const QUERY_PINS = gql`
  query Pins {
    signUp {
      id
      email
      name
      picture
    }
  }
`;
export const SIGNUP = gql`
  mutation SignUp {
    signUp {
      id
      email
      name
      picture
    }
  }
`;
export const ME = gql`
  query Me {
    me {
      id
      email
      name
      picture
    }
  }
`;
export const CREATE_PIN = gql`
  mutation CreatePin(
    $title: String!
    $content: String!
    $latitude: Float!
    $longitude: Float!
    $dateSpotted: Float!
  ) {
    createPin(
      pin: {
        title: $title
        content: $content
        latitude: $latitude
        longitude: $longitude
        dateSpotted: $dateSpotted
      }
    ) {
      id
      title
      content
      latitude
      longitude
      dateSpotted
      author {
        id
        name
        email
      }
    }
  }
`;
export const DELETE_PIN = gql`
  mutation DeletePin($pin: ID!) {
    deletePin(pin: $pin) {
      id
      title
      latitude
      longitude
      dateSpotted
      content
      author {
        id
        name
        email
      }
    }
  }
`;
export const UPDATE_PIN = gql`
  mutation UpdatePin(
    $pinId: ID!
    $title: String
    $content: String
    $latitude: Float
    $longitude: Float
    $dateSpotted: Float
  ) {
    updatePin(
      pinId: $pinId
      pin: {
        title: $title
        content: $content
        latitude: $latitude
        longitude: $longitude
        dateSpotted: $dateSpotted
      }
    ) {
      id
      title
      content
      latitude
      longitude
      dateSpotted
      author {
        id
        name
        email
      }
    }
  }
`;

export const QUERY_COMMENTS = gql`
  query Comments($pinId: ID!) {
    comments(pinId: $pinId) {
      id
      text
      author {
        email
        name
      }
      pin {
        id
        title
      }
    }
  }
`;
