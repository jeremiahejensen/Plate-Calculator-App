import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import calculatePlates from "../calculate2";
import knownWeights from "../calculate2";
import { API } from 'aws-amplify';
import { listInventories } from '../graphql/queries';
import {username} from '../App.js';

const Home = () => { 
  const [plateInventory, setPlateInventory] = useState([]);
  const [desiredWeight, setDesiredWeight] = useState([]);
  const [platesIUsed, setPlatesIUsed] = useState([]);
  
  useEffect(() => {
    fetchPlates();
  }, [fetchPlates]);

  const handleSubmit = event => {
    var x = calculatePlates(desiredWeight, plateInventory);
    event.preventDefault();
    setPlatesIUsed(x);
  };
 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchPlates() {
    if (plateInventory.length) return;

    try {
      const apiData = await API.graphql({ query: listInventories, variables: { filter: {username: {eq: username}}}});
      setPlateInventory(apiData.data.listInventory.items);
    } catch (e) {
      console.log(e);
    }
  }

  console.log(plateInventory);
return (
  <form onSubmit={handleSubmit}>
    <label>Enter your weight:
      <input 
        type="text" 
        value= {desiredWeight}
        onChange={(e) => setDesiredWeight(e.target.value)}
      />
    </label>
    <input type="submit" />
    <h1>The weight you entered was: {desiredWeight}</h1>
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
 </form>
)
}


ReactDOM.render(<Home />, document.getElementById('root'));
export default Home;