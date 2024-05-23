import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newCar, setNewCar] = useState({ name: '', brand: '', type: '', year: '', is_available: true });
  const [validationError, setValidationError] = useState('');

  const carTypes = ['sedan', 'suv', 'hatchback', 'convertible', 'truck', 'van'];

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
    if (!newCar.name || !newCar.brand || !newCar.type || !newCar.year) {
      setValidationError('All fields are required');
      return;
    }
    setCars([...cars, newCar]);
    setNewCar({ name: '', brand: '', type: '', year: '', is_available: true });
    setValidationError('');
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
                <p>Brand: {car.brand}</p>
                <p>Type: {car.type}</p>
                <p>Year: {car.year}</p>
                <p>Availability: {car.is_available ? "yes" : "no"}</p>
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
          <select
            value={newCar.type}
            onChange={(e) => setNewCar({ ...newCar, type: e.target.value })}
          >
            <option value="">Select Type</option>
            {carTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Year"
            value={newCar.year}
            onChange={(e) => setNewCar({ ...newCar, year: e.target.value })}
          />
          <label>
            Is Available?
            <input
              type="checkbox"
              checked={newCar.is_available}
              onChange={(e) => setNewCar({ ...newCar, is_available: e.target.checked })}
            />
          </label>
          <button onClick={handleAddCar}>+</button>
          {validationError && <p className="error">{validationError}</p>}
        </div>
      </header>
    </div>
  );
}

export default App;
