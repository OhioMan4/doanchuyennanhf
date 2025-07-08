const express = require('express');
const mongoose = require('mongoose');
const dotenv=require('dotenv')
const app = express();
const cors=require('cors')
const helmet=require('helmet')
const connectDB = require('./config/database');
const budgetRoute=require('./routes/budgetRoutes');
const BudgetCategory = require('./routes/budgetCategory');

dotenv.config();

app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/budget',budgetRoute)
app.use('/api/budgetCategory',BudgetCategory)
app.get('/health', (req, res) => {
    res.json({ status: 'OK', service: 'budget-service' });
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Budget service is running on port ${PORT}`);
});