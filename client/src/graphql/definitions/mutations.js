import { gql } from "apollo-boost";

export const MUTATION_SIGNUP = gql`
  mutation SignUp {
    signUp {
      id
      email
      name
      picture
    }
  }
`;

export const MUTATION_CREATE_SIGHTING = gql`
  mutation CreateSighting(
    $longitude: Float!
    $latitude: Float!
    $species: String!
    $content: String
    $dateSpotted: Float!
    $countAdults: String
    $countYoung: String
    $direction: String
    $vocalizing: Boolean
    $activity: String
    $interactionWithObservers: String
    $observerDistance: String
    $observerLocation: String
    $imageUrl: String
  ) {
    createSighting(
      sighting: {
        content: $content
        longitude: $longitude
        latitude: $latitude
        dateSpotted: $dateSpotted
        species: $species
        countAdults: $countAdults
        countYoung: $countYoung
        direction: $direction
        vocalizing: $vocalizing
        activity: $activity
        interactionWithObservers: $interactionWithObservers
        observerDistance: $observerDistance
        observerLocation: $observerLocation
        imageUrl: $imageUrl
      }
    ) {
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

      createdAt
      updatedAt
    }
  }
`;
// export const MUTATION_CREATE_SIGHTING = gql`
//   mutation CreateSighting($sighting: String!) {
//     createSighting(sighting: $sighting) {
//       hello
//     }
//   }
// `;

// export const MUTATION_CREATE_SIGHTING = gql`
//   mutation CreateSighting($sightingId: ID!, $text: String!) {
//     createSighting(sighting: {
//       //     $latitude: Float!
// //     $longitude: Float!
// //     $species: String!
// //     $dateSpotted: Float! #
// //     $content: String
// //     $countYoung: String #
// //     $countAdults: String
// //     $direction: String
// //     $speed: String
// //     $vocalizing: Boolean
// //     $activity: String
// //     $observerInteraction: String
// //     $observerLocation: String
// //     $observerDistance: String

//       sightingId: $sightingId, text: $text }) {
//       text
//       createdAt
//       author {
//         name
//         picture
//       }
//       sighting {
//         id
//       }
//     }
//   }
// `;

// export const MUTATON_UPDATE_SIGHTING = gql`
//   mutation UpdateSighting(
//     $sightingId: ID!
//     $title: String
//     $content: String
//     $latitude: Float
//     $longitude: Float
//     $dateSpotted: Float
//     $image: String
//   ) {
//     updateSighting(
//       sightingId: $sightingId
//       sighting: {
//         title: $title
//         content: $content
//         latitude: $latitude
//         longitude: $longitude
//         dateSpotted: $dateSpotted
//         image: $image
//       }
//     ) {
//       id
//       title
//       content
//       latitude
//       longitude
//       dateSpotted
//       image
//       author {
//         id
//         name
//       }
//       createdAt
//       updatedAt
//     }
//   }
// `;

export const MUTATION_DELETE_SIGHTING = gql`
  mutation DeleteSighting($sightingId: ID!) {
    deleteSighting(sightingId: $sightingId) {
      id
    }
  }
`;

export const MUTATION_CREATE_COMMENT = gql`
  mutation CreateComment($sightingId: ID!, $text: String!) {
    createComment(sightingId: $sightingId, text: $text) {
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
