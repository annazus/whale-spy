import { gql } from "apollo-boost";

export const MUTATION_SIGNUP = gql`
  mutation SignUp {
    signUp {
      email
      name
      picture
    }
  }
`;

export const MUTATION_CREATE_PIN = gql`
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
      }
      createdAt
    }
  }
`;

export const MUTATON_UPDATE_PIN = gql`
  mutation UpdatePin(
    $title: String
    $content: String
    $latitude: Float
    $longitude: Float
    $dateSpotted: Float
  ) {
    updatePin(
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
      }
      createdAt
      updatedAt
    }
  }
`;

export const MUTATION_DELETE_PIN = gql`
  mutation DeletePin($pinId: ID!) {
    deletePin(pinID: $pinID) {
      id
      title
      content
      latitude
      longitude
      dateSpotted
      author {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const MUTATION_CREATE_COMMENT = gql`
  mutation CreateComment($pinId: ID!, $text: String!) {
    createComment(pinId: $pinId, text: $text) {
      text
      createdAt
      author {
        name
        picture
      }
      pin {
        id
      }
    }
  }
`;
