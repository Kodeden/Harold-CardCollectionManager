import './App.css';
import { Routes, Link, Route } from "react-router-dom";
import Cards from './components/Cards.js';
import NewCard from './components/NewCard.js';


function App() {
  return (
    <div className="App">
      <h1 className='header'>Card Collector</h1>  
      <div className='tabcontainer'>
        <div className='tab list'><Link to="/">Card List</Link></div>
        <div className='tab new'><Link to="/NewCard">Add Card</Link></div>
      </div>
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/NewCard" element={<NewCard />} />
      </Routes>
    </div>
  );
}
export default App;
