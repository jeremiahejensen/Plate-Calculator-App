import React from 'react';
import { BrowserRouter, Routes } from "react-router-dom";
import { render } from "react-dom";
import './index.css';
import { Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Contact from "./pages/Contact";
import Inventory from "./pages/Inventory";
import Calculator from "./pages/Calculator";


const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="contact" element={<Contact />} />
        <Route path="Inventory" element={<Inventory />} />
        <Route path="Calculator" element={<Calculator />} />
      </Route>
    </Routes>
    </BrowserRouter>,
  rootElement
);