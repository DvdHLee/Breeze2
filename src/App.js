import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home.js';
import Landing from './pages/Landing.js';
import { useState } from 'react';

function App() {
  const [landingLocation, setLandingLocation] = useState("");

  function searched(address) {
    setLandingLocation(address);
  };

  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path='/' element={<Landing searched={searched} />}></Route>
          <Route path='/Home' element={<Home landingLocation={landingLocation} />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
