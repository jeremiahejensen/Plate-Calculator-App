import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import React, { useState } from "react";
import Contact from "./pages/Contact";
import Inventory from "./pages/Inventory";
import Calculator from "./pages/Calculator";

Amplify.configure(awsExports);

function App({ signOut, user }) {
  const [showHideCalculator, setshowHideCalculator] = useState([]);
  const [showHideInventory, setshowHideInventory] = useState([]);
  const [showHideContact, setshowHideContact] = useState([]);


  function hideComponent(nameOfComponent) {
    console.log();
    switch (nameOfComponent) {
      case "showHideCalculator":
        setshowHideCalculator(!showHideCalculator);
        break;
      case "showHideInventory":
        setshowHideInventory(!showHideInventory);
        break;
      case "showHideContact":
        setshowHideContact(!showHideContact);
        break;
      default:
        console.log("whoops, hit the default route");

    }
  }

  return (
    <>
      <h1>Hello {user.username}</h1>
      <div>
    {showHideCalculator && <Calculator />}
    <hr />
    {showHideInventory && <Inventory user={user}/>}
    <hr />
    {showHideContact && <Contact />}
    <hr />
    <div>
      <button onClick={() => hideComponent("showHideCalculator")}>
        Click to hide Calculator component
      </button>
      <button onClick={() => hideComponent("showHideInventory")}>
        Click to hide Inventory component
      </button>
      <button onClick={() => hideComponent("showHideContact")}>
        Click to hide Contact component
      </button>
    </div>
         <button onClick={signOut}>Sign out</button>
  </div>
    </>
  );
}

export default withAuthenticator(App);

/* 
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import './App.css';
import { render } from "react-dom";
import React, { useState } from "react";
import './index.css';
import Contact from "./pages/Contact";
import Inventory from "./pages/Inventory";
import Calculator from "./pages/Calculator";
Amplify.configure(awsExports);

function App({ isPassedToWithAuthenticator, signOut, user }) {

  const [showHideCalculator, setshowHideCalculator] = useState([]);
  const [showHideInventory, setshowHideInventory] = useState([]);
  const [showHideContact, setshowHideContact] = useState([]);


  function hideComponent(nameOfComponent) {
    console.log();
    switch (nameOfComponent) {
      case "showHideCalculator":
        setshowHideCalculator(!showHideCalculator);
        break;
      case "showHideInventory":
        setshowHideInventory(!showHideInventory);
        break;
      case "showHideContact":
        setshowHideContact(!showHideContact);
        break;
      default:
        console.log("whoops, hit the default route");

    }
  }

  console.log("Inside app user is " + user);
  return ( 
    <div>
    {showHideCalculator && <Calculator />}
    <hr />
    {showHideInventory && <Inventory user={user}/>}
    <hr />
    {showHideContact && <Contact />}
    <hr />
    <div>
      <button onClick={() => hideComponent("showHideCalculator")}>
        Click to hide Calculator component
      </button>
      <button onClick={() => hideComponent("showHideInventory")}>
        Click to hide Inventory component
      </button>
      <button onClick={() => hideComponent("showHideContact")}>
        Click to hide Contact component
      </button>
    </div>
         <button onClick={signOut}>Sign out</button>
  </div>
  );
}

 export default withAuthenticator(App);
 render(<App />, document.getElementById("root"));
  export async function getStaticProps() {
  return {
    props: {
      isPassedToWithAuthenticator: true,
    },
  };
};

 */