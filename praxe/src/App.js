import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newCar, setNewCar] = useState({ name: '', brand: '', year: '', price: '' });

  useEffect(() => {
    axios.get('http://localhost:5001/api/cars')
      .then(response => {
        console.log('API response:', response);
        setCars(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching car data:', error);
        setError('Failed to fetch car data');
        setLoading(false);
      });
  }, []);

  const handleAddCar = () => {
    setCars([...cars, newCar]);
    setNewCar({ name: '', brand: '', year: '', price: '' });
  };

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
                <p>Brand: {car.model}</p>
                <p>Type:{car.type}</p>
                <p>Year: {car.year}</p>
                <p>Availability: {car.is_available? "yes" : "no"}</p>
              </li>
            ))}
          </ul>
        )}
        <div className="new-car-form">
          <input
            type="text"
            placeholder="Name"
            value={newCar.name}
            onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Brand"
            value={newCar.brand}
            onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })}
          />
          <input
            type="text"
            placeholder="Year"
            value={newCar.year}
            onChange={(e) => setNewCar({ ...newCar, year: e.target.value })}
          />
          <input
            type="text"
            placeholder="Price"
            value={newCar.price}
            onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
          />
          <button onClick={handleAddCar}>+</button>
        </div>
      </header>
    </div>
  );
}

export default App;
