import { gql } from "@apollo/client";

export const ALL_VEHICLES = gql`
  query Vehicles {
    vehicles {
      id
      title
      description
      icons {
        large
        medium
        small
      }
      level
      type {
        name
        title
        icons {
          default
        }
      }
      typeName
      nation {
        name
        title
        color
        icons {
          small
          medium
          large
        }
      }
    }
  }
`;
