import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import './App.css';
import { Link } from "react-router-dom";
Amplify.configure(awsExports);

var username = '';
export default function App({ isPassedToWithAuthenticator, signOut, user }) {

  username = user.username;

  return ( 

    <div>
      <nav>
      <Link to="/Calculator">Calculator</Link> |{" "}
        <Link to="/Inventory">Inventory</Link>
        <Link to="/Contact">Contact</Link>
         </nav>
    </div>
  );
  }
  export {username};
  
  //export {withAuthenticator(Inventory)};
  export async function getStaticProps() {
  return {
    props: {
      isPassedToWithAuthenticator: true,
    },
  };
};

