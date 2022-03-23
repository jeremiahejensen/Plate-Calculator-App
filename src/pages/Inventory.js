import { DataStore } from '@aws-amplify/datastore';
import { Inventory as InventoryModel } from '../models';


import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { deleteInventory as deleteInventoryMutation } from '../graphql/mutations';
// import { HexColorPicker } from "react-colorful";
import '@aws-amplify/ui-react/styles.css';
import '../App.css';
import fetchPlates from '../DataBase';


var initialFormState = { weight: 0, color: '#000000' };
var Inventory = ({ user, signOut }) => {

  useEffect(() => {
    getInventory();
  }, [getInventory]);
   
  var [weights, setWeights] = useState([]);
  var [formData, setFormData] = useState(initialFormState);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getInventory() {

    if (weights.length > 0) return;

    var x;
    x = await fetchPlates();
    console.log("fetchPlates returned " + x.length  + " plates in the inventory");
  
    setWeights(x);

  }

  //This is the function that writes to the database
  async function createPlates() {
    await DataStore.save(
    new InventoryModel({
		"weight": Number(formData.weight),
		"username": user.username,
		 "color": formData.color,
		"inventory": parseInt(formData.inventory, 10)
	})
);

}

  async function deletePlate(weightToDelete) {
    var newPlatesArray = weights.filter(weight => weight.id !== weightToDelete.id);
    setWeights(newPlatesArray);
    console.log('I am about to delete ID' + weightToDelete.id + ' And verison ' + weightToDelete._version);
    try {
      await API.graphql({ query: deleteInventoryMutation, variables: { input: {"id": weightToDelete.id, "_version": weightToDelete._version} }});
    } catch (e) {
      console.log(e);
    }
  }

  // const handleColorChange = ({ hex }) => console.log(hex);


  return (
    <div className="App">
           <h1>Inventory</h1>
        <h1>Hello {user.username}</h1>
  
  <p>Choose your weight's color:</p>
  <div>
<input type="color" id="color" name="color"
onChange={e => setFormData({ ...formData, 'color': e.target.value})}
placeholder="color"
value={formData.color} 
     />
  </div>
  <br/>
  <label htmlFor="weightInput">Weight (LBS):</label>
  <input
    onChange={e => setFormData({ ...formData, 'weight': e.target.value})}
    id="weightInput"
    placeholder="weight"
    value={formData.weight}
  />
  <br/>

  <label htmlFor="invInput">How many pairs of plates do you have?:</label>
  <input
    onChange={e => setFormData({ ...formData, 'inventory': e.target.value})}
    id="invInput"
    placeholder="inventory"
    value={formData.inventory}
  />
  <br/>


  <button onClick={createPlates}>Create Plate</button>
  <br/> 
  
  <div style={{marginBottom: 30}}>
    <h3 className="p-3 text-center">List Of Weights</h3>
    <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Weight</th>
                    <th>Color</th>
                    <th>Plates</th>
                </tr>
            </thead>
      <tbody>
          {weights.map(weight =>
              <tr key={weight.id}>
                  <td>{weight.weight}</td>
                  <td bgcolor={weight.color}></td>
                  {/* <td><HexColorPicker color= {weight.color} onChangeComplete={ handleColorChange }/></td> */}

                  <button onClick={() => deletePlate(weight)}>Delete Plate</button>
                  
              </tr>
          )}
          
      </tbody>
    </table>
  </div>
</div>
);
  };
  export default Inventory;