// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Inventory, Plates } = initSchema(schema);

export {
  Inventory,
  Plates
};