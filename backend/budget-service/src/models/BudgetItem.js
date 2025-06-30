const { match } = require('assert');
const mongoose = require('mongoose')
const budgetItemSchema = new mongoose.Schema({
  budgetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Budget',
    required: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BudgetCategory',
    required: true
  },
  name: {
    type: String,
    required: true,
    min: 0
  },
  amount: {
    type: Number,
    required: true,
    min:0
  },
  date: {
    type: String,
    required: true,
    match:/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/ //YYYY_MM_DD
  }
}, { timestamps: true });

module.exports = mongoose.model('BudgetItem', budgetItemSchema);
