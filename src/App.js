import { API, Amplify, graphqlOperation} from 'aws-amplify';
import { createPlates, newPlate } from './graphql/mutations';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import { createPlates as createPlatesMutation } from './graphql/mutations';
import './App.css';

Amplify.configure(awsExports);

//API.graphql(graphqlOperation(createPlates, {input: newPlate}));

function App({ isPassedToWithAuthenticator, signOut, user }) {
// if (!isPassedToWithAuthenticator) {
  // throw new Error(`isPassedToWithAuthenticator was not provided`);
  //}



  
  async function createPlates() {
    const newPlate = { 
      Weight: 45,
      description: "hello",
      username: user.username,
      color: '000000'
  };
    await API.graphql({ query: createPlatesMutation, variables: { input: newPlate } });
  }


  return (
    <>
      <button onClick={createPlates}>Create Plate</button>
      <h1>Hello {user.username}</h1>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}

export default withAuthenticator(App);
//await API.graphql(graphqlOperation(createPlates, {input: todo}));

export async function getStaticProps() {
  return {
    props: {
      isPassedToWithAuthenticator: true,
    },
  };
}