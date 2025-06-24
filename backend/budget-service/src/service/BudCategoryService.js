const Budget= require  ("../models/Budget");
const BudgetCategory =require ("../models/BudgetCategory");
const BudgetItem =require ("../models/BudgetItem");

exports.createNewCategory=async ({userId,name,color,icon,budgetId})=>{
  const existing=await BudgetCategory.findOne({userId,name});
  if(existing){
    throw new Error("Already Exist !! ")
  }
  const category=new BudgetCategory({userId,name,color,icon,budgetId});
  return await category.save();
}

exports.getUserCategory=async({userId,budgetId})=>{
  const dataUserCategory= await BudgetCategory.find({userId,budgetId});
  return dataUserCategory;
}

exports.createBudgetItemInCategory=async({budgetId,categoryId,name,amount,date})=>{
  const budgetCategory=await BudgetCategory.findOne({_id:categoryId});
  console.log(budgetCategory)

  if (!budgetCategory) throw new Error("Missing BudgetCategory")

  const item =new BudgetItem({budgetId,categoryId,name,amount,date});
  return await item.save()
},
exports.deleteBudgetItemInCategory=async({budgetId,categoryId})=>{
  const budgetCategory=await BudgetCategory.findOne({_id:categoryId});
  console.log(budgetCategory)

  if (!budgetCategory) throw new Error("Missing BudgetCategory")

  const item =new BudgetItem.deleteMany({categoryId})
  return  {message: "Delete Item Successfully"}
},

exports.deleteCategory=async({budgetId,categoryId})=>{
  console.log({budgetId,categoryId})
  
  const category=await BudgetCategory.findOne({_id:categoryId,budgetId:budgetId});
  if(!category) return {message: "Category Not Found"}

  await BudgetItem.deleteMany({categoryId});
  await BudgetCategory.deleteOne({_id:categoryId});
  return {message: "Delete Category Successfully"}
},
exports.changeCategoryName=async({budgetId,categoryId,newName})=>{
  console.log({budgetId,categoryId,newName})
  if (!budgetId||!categoryId) throw new Error("Missing Id of budget or category");
  
  const category=await BudgetCategory.findOne({_id:categoryId,userId:budgetId});
  if(!category) throw new Error('Category not found !!')

  category.name=newName;
  return await category.save();
}

//API transaction
exports.getBudgetCategoryAndIteam=async({userId,month})=>{
  try {
    const budget=await Budget.findOne({userId,month});
    const budgetCategory=await BudgetCategory.find({userId,budgetId:budget._id});
    const budgetItem=await BudgetItem.find({userId,budgetId:budget._id});
    return {budgetCategory,budgetItem}
  } catch (error) {
    throw error
  }
}
