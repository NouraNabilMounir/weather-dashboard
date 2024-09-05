import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { SunIcon, CloudIcon, CloudArrowDownIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { UserIcon, ClockIcon } from '@heroicons/react/24/outline'; // Import UserIcon and ClockIcon

const CitySchema = Yup.object().shape({
  cityName: Yup.string()
    .required('City name is required')
    .matches(/^[a-zA-Z\s]+$/, 'Invalid city name'),
});

class CityForm extends React.Component {
  state = {
    weatherData: null,
    error: null,
  };

  fetchWeather = async (cityName) => {
    const apiKey = 'b5cfddd91b3849b5987dd9a9f7115fd1';
    const cacheKey = `weather_${cityName}`;
    const cachedData = JSON.parse(localStorage.getItem(cacheKey));
    const cacheExpiration = 30 * 60 * 1000; // 30 minutes

    if (cachedData && (new Date() - new Date(cachedData.timestamp) < cacheExpiration)) {
      this.setState({ weatherData: cachedData.data, error: null });
      return;
    }

    try {
      const response = await axios.get(
        `https://api.weatherbit.io/v2.0/current?city=${cityName}&key=${apiKey}`
      );
      const data = response.data.data[0];
      this.setState({ weatherData: data, error: null });
      
      // Save to cache
      localStorage.setItem(cacheKey, JSON.stringify({
        data,
        timestamp: new Date(),
      }));

      // Save to search history
      let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
      if (!searchHistory.includes(cityName)) {
        searchHistory.push(cityName);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        this.setState({ error: 'Too many requests. Please wait before trying again.' });
      } else {
        this.setState({ error: 'Failed to fetch weather data. Please try again.' });
      }
    }
  };

  renderWeatherIcon = (description) => {
    if (description.toLowerCase().includes('sun')) {
      return <SunIcon className="h-8 w-8 text-yellow-500 animate-pulse" />;
    } else if (description.toLowerCase().includes('cloud')) {
      return <CloudIcon className="h-8 w-8 text-gray-500 animate-bounce" />;
    } else if (description.toLowerCase().includes('rain')) {
      return <CloudArrowDownIcon className="h-8 w-8 text-blue-500 animate-rain" />;
    } else {
      return <SunIcon className="h-8 w-8 text-gray-500" />;
    }
  };

  renderWeatherInfo = () => {
    const { weatherData } = this.state;
    if (!weatherData) return null;

    return (
      <div className="mt-8 bg-white bg-opacity-20 backdrop-blur-lg p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-4">
          {this.renderWeatherIcon(weatherData.weather.description)}
        </div>
        <h2 className="text-3xl font-semibold text-center">{weatherData.city_name}</h2>
        <div className="flex flex-col items-center mt-4">
          <p className="text-lg">Temperature: {weatherData.temp}°C</p>
          <p className="text-lg">Weather: {weatherData.weather.description}</p>
          <p className="text-lg">Humidity: {weatherData.rh}%</p>
          <p className="text-lg">Wind Speed: {weatherData.wind_spd} m/s</p>
        </div>
      </div>
    );
  };

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
          <h1 className="text-center font-extrabold text-4xl mb-5">City Weather Search</h1>
          
          <Formik
            initialValues={{ cityName: '' }}
            validationSchema={CitySchema}
            onSubmit={(values) => {
              this.fetchWeather(values.cityName);
            }}
          >
            {() => (
              <Form className="bg-white bg-opacity-20 backdrop-blur-lg p-6 rounded-lg shadow-md w-80">
                <div className="mb-4">
                  <Field
                    name="cityName"
                    placeholder="Enter city name"
                    className="p-2 border rounded w-full text-gray-900"
                  />
                  <ErrorMessage
                    name="cityName"
                    component="div"
                    className="text-red-500 text-sm mt-2"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition"
                >
                  Get Weather
                </button>
              </Form>
            )}
          </Formik>

          {this.renderWeatherInfo()}

          {this.state.error && (
            <div className="text-red-500 mt-4">{this.state.error}</div>
          )}
        </div>
      </div>
    );
  }
}

export default CityForm;
