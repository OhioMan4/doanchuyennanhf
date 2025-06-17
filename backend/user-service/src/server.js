const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const dotenv=require('dotenv')
const app = express();
const cors=require('cors')
const helmet=require('helmet')
const connectDB = require('./config/database');

dotenv.config();

app.use(express.json());
app.use(cors());

app.use('/user', userRoutes);


connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`User service is running on port ${PORT}`);
});

