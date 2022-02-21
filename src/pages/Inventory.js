import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { createInventory as createInventoryMutation, deleteInventory as deleteInventoryMutation } from '../graphql/mutations';
import { listInventories } from '../graphql/queries';
// import { withAuthenticator } from '@aws-amplify/ui-react';
// import { HexColorPicker } from "react-colorful";
import '@aws-amplify/ui-react/styles.css';
import '../App.css';
import {username as loggedInUser} from '../App.js';

const initialFormState = { weight: 0, color: '#000000' };
const Inventory = ({ user, signOut }) => {

  useEffect(() => {
    fetchPlates();
  }, [fetchPlates]);
   
  const [weights, setWeights] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  


  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchPlates() {
    try {
      const apiData = await API.graphql({ 
        query: listInventories, 
        variables: { 
          filter: {username: {eq: loggedInUser}}
        }
      });
      // TODO: Fix the query to only return plates that have not been deleted

      // Remove all the deleted inventory
      var filteredList = apiData.data.listInventories.items.filter(weight => weight._deleted !== true);

      // Save our list of inventory with no deleted records
      setWeights(filteredList);
    } catch (e) {
      console.log(e);
    }
  }


  //This is the function that writes to the database
  async function createPlates() {
    const newPlate = { 
      weight: formData.weight,
      inventory: formData.inventory,
      username: loggedInUser,
      color: formData.color
  };
     await API.graphql({ query: createInventoryMutation, variables: { input: newPlate } }).then(()=>{fetchPlates();});
  }

  async function deletePlate(weightToDelete) {
    const newPlatesArray = weights.filter(weight => weight.id !== weightToDelete.id);
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
        <h1>Hello {loggedInUser}</h1>
  
  <p>Choose your weight's color:</p>
  <div>
<input type="color" id="color" name="color"
onChange={e => setFormData({ ...formData, 'color': e.target.value})}
placeholder="Color"
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
                  <td>{weight.color}</td>
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