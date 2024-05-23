const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5001;

app.use(cors());

app.get('/api/cars', async (req, res) => {
  try {
    const response = await axios.get('https://car.jakubgrezl.cz/cars');
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching car data');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
