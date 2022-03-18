import React, { useState, useEffect } from 'react';
import calculatePlates from "../calculate2";
import knownWeights from "../calculate2";
// import fetchPlates from '../DataBase';
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import { Inventory as InventoryModel } from '../models';
import totalWeightUsed from '../calculate2';
 // eslint-disable-next-line react-hooks/exhaustive-deps
 async function fetchPlates() {

  



    var models = await DataStore.query(InventoryModel, Predicates.ALL, {
      sort: s => s.weight(SortDirection.DESCENDING)
    });
    return models;
  }

export default function Calculator(signOut) {
  const [plateInventory, setPlateInventory] = useState([]);
  const [desiredWeight, setDesiredWeight] = useState([]);
  const [platesIUsed, setPlatesIUsed] = useState([]);
  const [totalWeightUsed, setTotalWeightUsed] = useState([]);

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
    if (desiredWeight > totalWeightUsed) return;
    console.log("Sorry you do not have enough plates to do this lift");
  }

  function calculate(e) {
    e.preventDefault();
    console.log("hello from calculate. I want to lift " + desiredWeight + " I have " + plateInventory.length + " In my inventory");
    var temp = calculatePlates(desiredWeight, plateInventory);
    var temptotalWeightUsed = temp.totalWeightUsed;

    setTotalWeightUsed(temp.totalWeightUsed);

    var tempplatesIUsed = temp.platesIUsed;
    console.log("Calculate function returned " + temptotalWeightUsed + ' lbs.');
    setPlatesIUsed([...temp.platesIUsed]);
    console.log("temp.PlatesIUsed has " + temp.platesIUsed.length + " plates.");
    console.log("tempplatesIUsed has " + tempplatesIUsed.length + " plates.");
    console.log("Calculate function returned " + platesIUsed.length + " plates.");
  }

  function setDesiredWeightHandler(value) {
    setPlatesIUsed([]);
    setTotalWeightUsed(0);
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

      { desiredWeight > 0 &&
        <div> 
        <p>You asked for {desiredWeight}</p>
        </div>
      }

      { totalWeightUsed > 0 &&
        <div> 
        <p>You're getting {totalWeightUsed} lbs</p>
        </div>
      }

    { platesIUsed.length > 0 &&
      <div style={{marginBottom: 30}}>
        <p>I calculated and you're getting:</p>
        <table style={{width: 20}} className="table table-striped table-bordered">
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
                <td bgcolor="green">{plate.weight}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    }

    
 <div>
    
    <button  style={{margin: 20}} type="button" onClick={calculate}>Calculate Plates</button>    
    
</div>

    </div>



  );
}
