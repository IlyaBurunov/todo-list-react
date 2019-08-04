import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import RouterService from "./Router";
import './App.css';

function App() {
 return (
     <Router>
         <Route component={RouterService}/>
     </Router>
 )
}

export default App;
