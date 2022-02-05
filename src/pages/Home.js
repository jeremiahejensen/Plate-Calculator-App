import { useState } from "react";
import ReactDOM from 'react-dom';
import knownWeights from "../calculate2";
import platesIUsed from "../calculate2";



const Home = () => { const [platesIUsed, setName] = useState("");

const handleSubmit = (knownWeights) => {
  knownWeights.preventDefault();
  alert(`The weight you entered was: ${platesIUsed}`);
}

return (
  <form onSubmit={handleSubmit}>
    <label>Enter your weight:
      <input 
        type="text" 
        value={platesIUsed}
        onChange={(e) => setName(e.target.value)}
      />
    </label>
    <input type="submit" />
    <input></input>
  </form>
)
}


ReactDOM.render(<Home />, document.getElementById('root'));
export default Home;
