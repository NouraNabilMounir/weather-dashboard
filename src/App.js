import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CityForm from './components/CityForm';
import WeatherDashboard from './components/WeatherDashboard';
import UserProfile from './components/UserProfile';
import SearchHistory from './components/SearchHistory';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WeatherDashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/search-history" element={<SearchHistory />} />
          <Route path="/city-form" element={<CityForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
