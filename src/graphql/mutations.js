/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPlates = /* GraphQL */ `
  mutation CreatePlates(
    $input: CreatePlatesInput!
    $condition: ModelPlatesConditionInput
  ) {
    createPlates(input: $input, condition: $condition) {
      id
      name
      description
      username
      createdAt
      updatedAt
    }
  }
`;
export const updatePlates = /* GraphQL */ `
  mutation UpdatePlates(
    $input: UpdatePlatesInput!
    $condition: ModelPlatesConditionInput
  ) {
    updatePlates(input: $input, condition: $condition) {
      id
      name
      description
      username
      createdAt
      updatedAt
    }
  }
`;
export const deletePlates = /* GraphQL */ `
  mutation DeletePlates(
    $input: DeletePlatesInput!
    $condition: ModelPlatesConditionInput
  ) {
    deletePlates(input: $input, condition: $condition) {
      id
      name
      description
      username
      createdAt
      updatedAt
    }
  }
`;
