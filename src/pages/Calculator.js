import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import calculatePlates from "../calculate2";
import knownWeights from "../calculate2";
// import fetchPlates from '../DataBase';
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import { Inventory as InventoryModel } from '../models';

 // eslint-disable-next-line react-hooks/exhaustive-deps
 async function fetchPlates() {

    var models = await DataStore.query(InventoryModel, Predicates.ALL, {
      sort: s => s.weight(SortDirection.DESCENDING)
    });
    return models;
  }

export default function Calculator() {
  const [plateInventory, setPlateInventory] = useState([]);
  const [desiredWeight, setDesiredWeight] = useState([]);
  const [platesIUsed, setPlatesIUsed] = useState([]);


  useEffect(() => {
    getInventory();
  }, []);

  async function getInventory() {
    // const models = await DataStore.query(InventoryModel, Predicates.ALL, {
    //   sort: s => s.weight(SortDirection.DESCENDING)
    // });
    if (plateInventory.length > 0) return;
    var x;
    x = await fetchPlates();
    setPlateInventory(x);
    console.log('====== Finished getting inventory');
    console.log(platesIUsed);
  }

  function calculate(e) {
    e.preventDefault();
    console.log("hello from calculate. I want to lift " + desiredWeight + " I have " + plateInventory.length + " In my inventory");
    var newPlateList = calculatePlates(desiredWeight, plateInventory);
    setPlatesIUsed(newPlateList);
    console.log(newPlateList);
  }

function setDesiredWeightHandler(value) {

  setPlatesIUsed([]);
  setDesiredWeight(value);
}


  return (
    <div>
      <label>Enter your weight:
      <input
        type="text" 
        value= {desiredWeight}
        onChange={(e) => setDesiredWeightHandler(e.target.value)}
      />
      </label>

      <h1>The plates you need are: {knownWeights}</h1>
    
    { platesIUsed.length > 0 &&
      <div style={{marginBottom: 30}}>
        <table className="table table-striped table-bordered">
          <thead>
            <tr key="header">
              <th>Weight</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>
            {platesIUsed.map(plate =>
              <tr key={plate.id}>
                <td>{plate.weight}</td>
                <td>{plate.color}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    }

<button type="button" onClick={calculate}>Calculate Plates</button>


    </div>



  );
}
