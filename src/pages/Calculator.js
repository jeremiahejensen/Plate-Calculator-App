import React, { useState, useEffect } from 'react';
import calculatePlates from "../calculate2";
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import { Inventory as InventoryModel } from '../models';
import bar from '../calculate2';

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
  const [message, setMessage] = useState([]);

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
    var returnValue = calculatePlates(desiredWeight, plateInventory);
    setMessage(returnValue.message);
    setTotalWeightUsed(returnValue.totalWeightUsed);
    setPlatesIUsed([...returnValue.platesIUsed]);   


    if (desiredWeight <= 45) {
      console.log('THIS DOES NOT NEED TO PRINT');
    }




  }

  function setDesiredWeightHandler(value) {
    setPlatesIUsed([]);
    setTotalWeightUsed(0);
    setDesiredWeight(value);
  }

  return (
    <div>
      <label>Please enter your weight:
      <input
        type="text" 
        value= {desiredWeight}
        onChange={(e) => setDesiredWeightHandler(e.target.value)}
      />
      </label>
       { desiredWeight > 0 &&
        <div> 
        <p>You requested {desiredWeight}</p>
        </div>
      }   

      { totalWeightUsed > 0 &&
        <div> 
        <p>You're getting {totalWeightUsed} lbs</p>
        </div>
      }

      { message && 
    <div>
      <p>{message}</p> 
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