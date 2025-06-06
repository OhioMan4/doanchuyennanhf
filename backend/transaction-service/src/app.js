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


connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Transaction service is running on port ${PORT}`);
});

