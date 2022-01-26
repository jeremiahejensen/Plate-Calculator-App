import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { createPlates as createPlatesMutation, deletePlates as deletePlatesMutation } from '../graphql/mutations';
import { listPlates } from '../graphql/queries';
import { HexColorPicker } from "react-colorful";
import '@aws-amplify/ui-react/styles.css';
import '../App.css';
import {username} from '../App.js'
const initialFormState = { weight: 0, color: '#000000' }

const Inventory = ({ user, signOut }) => {

  useEffect(() => {
    fetchPlates();
  }, [fetchPlates]);
   
  const [weights, setWeights] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  
  
  //This is the function that writes to the database
  async function createPlates() {
    const newPlate = { 
      Weight: formData.weight,
      description: "hello",
      username: username,
      color: formData.color
  };
     await API.graphql({ query: createPlatesMutation, variables: { input: newPlate } }).then(()=>{fetchPlates()});
  }

  
  async function fetchPlates() {
    try {
      const apiData = await API.graphql({ query: listPlates, variables: { filter: {username: {eq: username}}}})
      setWeights(apiData.data.listPlates.items);
    } catch (e) {
      console.log(e)
    }
  }


  async function deletePlate({ id }) {
    const newPlatesArray = weights.filter(weight => weight.id !== id);
    setWeights(newPlatesArray);
    await API.graphql({ query: deletePlatesMutation, variables: { input: { id } }});
  }

  const handleColorChange = ({ hex }) => console.log(hex)


  return (
    <div className="App">
           <h1>Inventory</h1>
        <h1>Hello {username}</h1>
  
  <p>Choose your weight's color:</p>
  <div>
<input type="color" id="color" name="color"
onChange={e => setFormData({ ...formData, 'color': e.target.value})}
placeholder="Color"
value={formData.color} 
     />
  </div>
  <br/>
  <label for="weight">Weight (LBS):</label>
  <input
    onChange={e => setFormData({ ...formData, 'weight': e.target.value})}
    placeholder="Weight"
    value={formData.weight}
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
                  <td>{weight.Weight} {weight.Weight}</td>
                  <td>{weight.color}</td>
                  {/* <td><HexColorPicker color= {weight.color} onChangeComplete={ handleColorChange }/></td> */}

                  <button onClick={() => deletePlate(weight)}>Delete Plate</button>
              </tr>
          )}
      </tbody>
    </table>
  </div>
  <button onClick={signOut}>Sign out</button>
</div>
);
  };
  
  export default Inventory;