const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId :{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Item',
        required: true
    },
    itemId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Item',
        required: false,
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
    },
});

module.exports = mongoose.model('Transaction', transactionSchema);
