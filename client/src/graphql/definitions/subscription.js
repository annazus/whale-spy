import { gql } from "apollo-boost";

export const PIN_ADDED_SUBSCRIPTION = gql`
  subscription PinAdded {
    pinAdded {
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
    }
  }
`;
export const PIN_UPDATED_SUBSCRIPTION = gql`
  subscription PinUpdated {
    pinUpdated {
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
    }
  }
`;
export const PIN_DELETED_SUBSCRIPTION = gql`
  subscription PinDeleted {
    pinDeleted {
      id
    }
  }
`;
export const COMMENT_ADDED_SUBSCRIPTION = gql`
  subscription CommentAdded($pinId: ID!) {
    commentAdded(pinId: $pinId) {
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
