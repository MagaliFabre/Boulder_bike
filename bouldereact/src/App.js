import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ResponsiveAppBar from './ResponsiveAppBar'; 
import HomePage from './components/HomePage';
import PhotosPage from './components/PhotosPage';
import LocationPage from './components/LocationPage';
import RidersPage from './components/RidersPage';
import ContestPage from './components/ContestPage';


function App() {
  return (
    <Router>
      <div className="App">
        <ResponsiveAppBar /> {}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/photos" element={<PhotosPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/riders" element={<RidersPage />} />
          <Route path="/contest" element={<ContestPage />} />
        </Routes>
        {}
      </div>
    </Router>
  );
}

export default App;
