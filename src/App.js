import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import React, { useState } from "react";
import Layout from "./pages/Layout";
import Contact from "./pages/Contact";
import Inventory from "./pages/Inventory";
import Calculator from "./pages/Calculator";

Amplify.configure(awsExports);

function App({ signOut, user }) {
  const [showHideCalculator, setshowHideCalculator] = useState(true);
  const [showHideInventory, setshowHideInventory] = useState(false);
  const [showHideContact, setshowHideContact] = useState(false);

  function showComponent(nameOfComponent) {

    switch(nameOfComponent) {
      case "showCalculator": // if (nameOfComponent==showCalculator) then ...
        setshowHideCalculator(true);
        setshowHideInventory(false);
        setshowHideContact(false);
        break;
      case "showInventory":        
      setshowHideCalculator(false);
      setshowHideInventory(true);
      setshowHideContact(false);
        break;
      case "showContact":
        setshowHideCalculator(false);
      setshowHideInventory(false);
      setshowHideContact(true);
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
    
    {showHideInventory && <Inventory user={user}/>}
    
    {showHideContact && <Contact />}
  
    <div>
    </div>
         <button onClick={signOut}>Sign out</button>
    </div>

<div class="dropdown">
  <button class="dropbtn">Options</button>
  <div class="dropdown-content">
    
  <button onClick={() => showComponent("showCalculator")}>
       Calculator
      </button>
    
      <button onClick={() => showComponent("showInventory")}>
        Inventory
      </button>
    
      <button onClick={() => showComponent("showContact")}>
        Contact
      </button>
  </div>
</div>
  
    </>
  );
}


export default withAuthenticator(App);