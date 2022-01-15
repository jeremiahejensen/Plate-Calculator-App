import React, { useState, useEffect } from 'react';
import { API, Amplify, graphqlOperation} from 'aws-amplify';
import { createPlates, newPlate } from './graphql/mutations';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import { createPlates as createPlatesMutation } from './graphql/mutations';
import './App.css';

Amplify.configure(awsExports);

const initialFormState = { weight: 0, color: '#000000' }



function App({ isPassedToWithAuthenticator, signOut, user }) {
  
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
    await API.graphql({ query: createPlatesMutation, variables: { input: newPlate } });
  }

  return (
    <div className="App">
   
      <h1>Hello {user.username}</h1>
      <label for="color">Color:</label>
      <p>Choose your weight's colors:</p>
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