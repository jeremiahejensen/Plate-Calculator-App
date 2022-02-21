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
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncPlates = /* GraphQL */ `
  query SyncPlates(
    $filter: ModelPlatesFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPlates(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getInventory = /* GraphQL */ `
  query GetInventory($id: ID!) {
    getInventory(id: $id) {
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
export const listInventories = /* GraphQL */ `
  query ListInventories(
    $filter: ModelInventoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInventories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncInventories = /* GraphQL */ `
  query SyncInventories(
    $filter: ModelInventoryFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncInventories(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
