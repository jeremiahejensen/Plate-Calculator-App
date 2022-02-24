import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import { Inventory as InventoryModel } from './models';


 // eslint-disable-next-line react-hooks/exhaustive-deps
 async function fetchPlates() {

    const models = await DataStore.query(InventoryModel, Predicates.ALL, {
      sort: s => s.weight(SortDirection.DESCENDING)
    });

    return models;
  }


  export default fetchPlates;