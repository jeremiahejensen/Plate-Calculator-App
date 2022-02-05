import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Layout from "./pages/Layout";
import Contact from "./pages/Contact";
import Inventory from "./pages/Inventory";

Amplify.configure(awsExports);

var username = '';
function App({ isPassedToWithAuthenticator, signOut, user }) {

  username = user.username;

  return ( 

    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="Inventory" element={<Inventory />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
    <button onClick={signOut}>Sign out</button>
  </BrowserRouter>

  );
  }
  export {username};
  export default withAuthenticator(App, Inventory);
  //export {withAuthenticator(Inventory)};
  export async function getStaticProps() {
  return {
    props: {
      isPassedToWithAuthenticator: true,
    },
  };
};