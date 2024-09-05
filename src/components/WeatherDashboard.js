import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { UserIcon, ClockIcon } from '@heroicons/react/24/outline'; // Import UserIcon and ClockIcon

class WeatherDashboard extends Component {
  render() {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-400 to-blue-700 text-white">
        {/* Navbar */}
        <nav className="bg-blue-800 p-4 flex justify-between items-center">
          <Link to="/" className="text-white text-xl font-bold">Weather Dashboard</Link>
          <div className="flex space-x-4">
            <Link to="/profile" className="flex items-center text-white hover:text-gray-300">
              <UserIcon className="h-6 w-6" />
              <span className="ml-2">Profile</span>
            </Link>
            <Link to="/search-history" className="flex items-center text-white hover:text-gray-300">
              <ClockIcon className="h-6 w-6" />
              <span className="ml-2">History</span>
            </Link>
          </div>
        </nav>

        <div className="flex-grow flex flex-col items-center justify-center">
          <h1 className="text-center font-extrabold text-4xl mb-5">Weather Dashboard</h1>
          <Link to="/city-form" className="mt-8 bg-white text-blue-700 py-2 px-4 rounded-full hover:bg-blue-100 transition">
            Add City
          </Link>
        </div>
      </div>
    );
  }
}

export default WeatherDashboard;
