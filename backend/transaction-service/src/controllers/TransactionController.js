const Transaction = require('../models/Transaction');
const config=require('dotenv')
const TransactionService=require('../service/transactionService')

const axios=require('axios')
config.config();
const BUDGET_BASE_URL=process.env.BUDGET_SERVICE;

exports.getBudget=async(req,res)=>{
  try {
      const userId=req.user?.userId
      const month="2025-04"
      const res=await axios.get(BUDGET_BASE_URL,{
        params:{month}
      })
  }
  catch(err){
    res.status(500).json({ message: 'Error getBudgetService', error: err.message });
  }
}

exports.createTransaction = async (req, res) => {
    try {
        const userId=req.user?.userId;
        const { type, amount, date, description,itemId } = req.body;
        const transaction = new Transaction({
          userId,
          itemId,
          type,
          amount,
          date,
          description
      });
      await transaction.save();
        res.status(201).json("Transaction Created");
    } catch (error) { 
        res.status(500).json({ message: 'Error creating transaction', error: error.message });
    }
};

exports.getTransactions = async (req, res) => {
  const userId=req.user?.userId;
  const month=req.params.month;
  
  try{
    const dataTransaction=await TransactionService.getTransactions(userId,month);
    res.status(201).json(dataTransaction)
  }
  catch(error){
       res.status(500).json({message:"Error",error :error.message});
  }



};


exports.updateTransaction = async (req, res) => {
    const { id } = req.params;
    const { type, amount, date, category, description } = req.body;
    try {
      const updatedTransaction = await Transaction.findByIdAndUpdate(id, { type, amount, date, category, description }, { new: true });
      if (!updatedTransaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
      res.status(200).json(updatedTransaction);
    } catch (error) {
      res.status(500).json({ message: 'Error updating transaction', error: error.message });
    }
};

exports.deleteTransaction = async (req, res) => {
    const  id  = req.params.id;
    try {
      const deletedTransaction = await Transaction.deleteOne({_id:id});
      if (!deletedTransaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
      res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting transaction', error: error.message });
    }
};

exports.getTransactionSummary = async (req, res) => {
  const { year } = req.query;
  const filter = {};
  if (year) filter.date = { $gte: new Date(`${year}-01-01`), $lte: new Date(`${year}-12-31`) };
  
};
exports.deleteAllTransaction=async(req,res)=>{
  const userId = req.user?.userId;
  try {
    const deleted = await TransactionService.deleleAllTransaction(userId);

    if (deleted.deletedCount === 0) {
      return res.status(404).json({ message: 'No transactions found to delete' });
    }

    return res.status(200).json({
      message: 'All transactions deleted successfully',
      deletedCount: deleted.deletedCount
    });}
  catch(err){
    res.status(500).json({ message: 'Error deleting transaction', error: err.message });
  }
}



