import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5001/api/cars') // Change this to the new port
      .then(response => {
        console.log('API response:', response); // Log the response to check its structure
        setCars(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching car data:', error);
        setError('Failed to fetch car data');
        setLoading(false);
      });
  }, []);
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Car List</h1>
        {loading ? (
          <p>Loading cars...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ul>
            {cars.map((car, index) => (
              <li key={index}>
                <h2>{car.name}</h2>
                <p>Brand: {car.brand}</p>
                <p>Year: {car.year}</p>
                <p>Price: ${car.price}</p>
              </li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default App;
