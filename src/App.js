import React, { useState, useEffect } from 'react';
import { API, Amplify, graphqlOperation} from 'aws-amplify';
import { createPlates, newPlate } from './graphql/mutations';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import { createPlates as createPlatesMutation, deletePlates as deletePlatesMutation } from './graphql/mutations';
import { listPlates } from './graphql/queries';
import './App.css';
import { HexColorPicker } from "react-colorful";
Amplify.configure(awsExports);

const initialFormState = { weight: 0, color: '#000000' }




function App({ isPassedToWithAuthenticator, signOut, user }) {
 
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
      username: user.username,
      color: formData.color
  };
     await API.graphql({ query: createPlatesMutation, variables: { input: newPlate } }).then(()=>{fetchPlates()});
  }

  
  async function fetchPlates() {
    try {
      const apiData = await API.graphql({ query: listPlates, variables: { filter: {username: {eq: user.username}}}})
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
   
      <h1>Hello {user.username}</h1>
      
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
        {
          weights.map(weight => (
            <div key={weight.id || weight.Weight}>
              <h2>{weight.Weight}</h2>
              <HexColorPicker
        color= {weight.color}
        onChangeComplete={ handleColorChange }
      />
              <button onClick={() => deletePlate(weight)}>Delete Plate</button>
            </div>
          ))
        }
      </div>

      <button onClick={signOut}>Sign out</button>
      </div>
  );
}


export default withAuthenticator(App);
export async function getStaticProps() {
  return {
    props: {
      isPassedToWithAuthenticator: true,
    },
  };
}