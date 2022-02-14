import { useState } from "react";
import ReactDOM from 'react-dom';
import platesIUsed from "../calculate2";

const Home = () => { 
  const [desiredWeight, setDesiredWeight] = useState([]);

const handleSubmit = (knownWeights) => {
  console.log("Hello from handleSubmit");
  knownWeights.preventDefault();
};

console.log(platesIUsed);
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