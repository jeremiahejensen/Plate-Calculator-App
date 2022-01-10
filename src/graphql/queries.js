/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPlates = /* GraphQL */ `
  query GetPlates($id: ID!) {
    getPlates(id: $id) {
      id
      Weight
      description
      username
      color
      createdAt
      updatedAt
    }
  }
`;
export const listPlates = /* GraphQL */ `
  query ListPlates(
    $filter: ModelPlatesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Weight
        description
        username
        color
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
