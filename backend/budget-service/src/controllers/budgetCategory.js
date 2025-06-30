const BudCategoryService =require( '../service/BudCategoryService')

exports.createBudgetCategory=async(req,res)=>{
  try {
    const userId=req.user?.userId;
    const { name,color,icon}=req.body;
    const budgetId=req.params.budgetId;
    console.log(budgetId)
    const category =await BudCategoryService.createNewCategory({userId,name,color,icon,budgetId})
    res.status(201).json(category) 
  }
  catch(err){
    res.status(500).json({error:err.message})
  }
};

exports.getBudgetCategory=async(req,res)=>{
  try{
    const userId=req.user?.userId;
    const budgetId=req.params.budgetId;
    const category=await BudCategoryService.getUserCategory({userId,budgetId})
    if(!category){
      res.status.json({error:'BudgetCategory not found'})
    }
    res.status(201).json(category)
  }
  catch(err){
    res.status(500).json({error:err.message})
  }
};
exports.createBudgetItemInCategory=async(req,res)=>{
  const categoryId=req.params.categoryId
  const {name,budgetId,date,amount}=req.body
  console.log(budgetId)
  const createBudgetItem=await BudCategoryService.createBudgetItemInCategory({budgetId,categoryId,name,amount,date})
  if(!createBudgetItem){
    res.status(404).json({error:"Error in createBudgetItem"})  }
    res.status(201).json(createBudgetItem)  
}

exports.deleteCategoryOfBudget=async(req,res)=>{
  const {categoryId,budgetId}=req.body;
  const deleteBudgetCategory =await BudCategoryService.deleteCategory({budgetId,categoryId})
  if(!deleteBudgetCategory){
    res.status(404).json("Error in Delete Category !!")
  }
  res.status(201).json(deleteBudgetCategory)
},
exports.changeNameOfCategory=async(req,res)=>{
  const budgetId=req.user?.userId
  const{categoryId,newName}=req.body
  const change=await BudCategoryService.changeCategoryName({budgetId,categoryId,newName})
  if(!change) res.status(404).json("Error in Change Category")
  else res.status(201).json("Change Successfully")
}

exports.getBudgetCategoryAndIteam=async(req,res)=>{
  const userId=req.user?.userId
  const month=req.params.month
  const budgetCategoryAndIteam=await BudCategoryService.getBudgetCategoryAndIteam({userId,month})
  if(!budgetCategoryAndIteam) res.status(404).json("Error in get Budget Category And Iteam")
  else res.status(201).json(budgetCategoryAndIteam)
}