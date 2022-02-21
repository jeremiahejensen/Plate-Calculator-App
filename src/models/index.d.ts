import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type InventoryMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PlatesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Inventory {
  readonly id: string;
  readonly weight: number;
  readonly username: string;
  readonly color?: string;
  readonly inventory: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Inventory, InventoryMetaData>);
  static copyOf(source: Inventory, mutator: (draft: MutableModel<Inventory, InventoryMetaData>) => MutableModel<Inventory, InventoryMetaData> | void): Inventory;
}

export declare class Plates {
  readonly id: string;
  readonly Weight?: number;
  readonly description?: string;
  readonly username?: string;
  readonly color?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Plates, PlatesMetaData>);
  static copyOf(source: Plates, mutator: (draft: MutableModel<Plates, PlatesMetaData>) => MutableModel<Plates, PlatesMetaData> | void): Plates;
}