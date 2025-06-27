const Transaction =require( "../models/Transaction");

exports.getTransactions=async(userId)=>{
  try {
    // const start = new Date(`${month}-01T00:00:00.000Z`);
    // const end = new Date(new Date(start).setMonth(start.getMonth() + 1));
    const transactions=await Transaction.find({userId})
    return transactions
  } catch (error) {
    throw error
  }
}
exports.createTransaction=async(type, amount, date, categoryId, description,itemId)=>{
     return await Transaction.save({type, amount, date, categoryId, description,itemId})
}
exports.deleleAllTransaction=async(userId)=>{
  try{
    const transaction=await Transaction.deleteMany({userId})
    return transaction
  }
  catch(err){
    return json({message:"Fail to delete All transactions",error:err})
  }
}