/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPlates = /* GraphQL */ `
  mutation CreatePlates(
    $input: CreatePlatesInput!
    $condition: ModelPlatesConditionInput
  ) {
    createPlates(input: $input, condition: $condition) {
      id
      Weight
      description
      username
      color
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      Weight
      description
      username
      color
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      Weight
      description
      username
      color
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createInventory = /* GraphQL */ `
  mutation CreateInventory(
    $input: CreateInventoryInput!
    $condition: ModelInventoryConditionInput
  ) {
    createInventory(input: $input, condition: $condition) {
      id
      weight
      username
      color
      inventory
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateInventory = /* GraphQL */ `
  mutation UpdateInventory(
    $input: UpdateInventoryInput!
    $condition: ModelInventoryConditionInput
  ) {
    updateInventory(input: $input, condition: $condition) {
      id
      weight
      username
      color
      inventory
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteInventory = /* GraphQL */ `
  mutation DeleteInventory(
    $input: DeleteInventoryInput!
    $condition: ModelInventoryConditionInput
  ) {
    deleteInventory(input: $input, condition: $condition) {
      id
      weight
      username
      color
      inventory
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
