import { useState } from "react";
import ReactDOM from 'react-dom';
import platesIUsed from "../calculate2";


const Home = () => { const [setName] = useState("");


const handleSubmit = (knownWeights) => {
  knownWeights.preventDefault();
}

return (
  <form onSubmit={handleSubmit}>
    <label>Enter your weight:
      <input 
        type="text" 
        value= {setName}
        onChange={(e) => setName(e.target.value)}
      />
    </label>
    <input type="submit" />
    <h1>The weight you entered was: {setName}</h1>

   <div style={{marginBottom: 30}}>
    <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Weight</th>
                    <th>Color</th>
                </tr>
            </thead>
      <tbody>
      {platesIUsed.map(x =>
              <tr key={x.id}>
                  <td>{x.weight}</td>
                  <td>{x.color}</td>
              </tr>
          )}
      </tbody>
    </table>
  </div>
 </form>
)
}


ReactDOM.render(<Home />, document.getElementById('root'));
export default Home;