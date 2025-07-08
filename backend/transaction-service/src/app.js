const express = require('express');
const mongoose = require('mongoose');
const transactionRoutes = require('./routes/transactionRoutes');
const dotenv=require('dotenv')
const app = express();
const cors=require('cors')
const helmet=require('helmet')
const connectDB = require('./config/database');

dotenv.config();

app.use(express.json());
app.use(cors());

app.use('/transactions', transactionRoutes);
app.get('/health', (req, res) => {
    res.json({ status: 'OK', service: 'transaction-service' });
  });


connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT,'0.0.0.0', () => {
    console.log(`Transaction service is running on port ${PORT}`);
});

