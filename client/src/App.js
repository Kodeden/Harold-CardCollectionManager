import React from "react";
import './App.css';
import { Routes, Route } from "react-router-dom";
import Cards from './components/Cards.js';
import NewCard from './components/NewCard.js';


function App() {
  return (
    <div className="App">
      <h1 className='header'><div id='ccbox'><div id='cc'>CC</div></div>Card Collector</h1>  
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/NewCard" element={<NewCard />} />
      </Routes>
    </div>
  );
}
export default App;
