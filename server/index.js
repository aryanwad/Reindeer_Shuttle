const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB();

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
};
  
app.use(cors(corsOptions));
  
app.use(express.json());

app.get('/ping', (req, res) => res.send('pong'));

app.use('/api/auth', require('./routes/auth'));

app.use('/api/checkin', require('./routes/checkin'));

app.use('/api/bookings', require('./routes/bookings'));

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
