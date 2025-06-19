import {BudgetData} from "../models/budget";

export const adapterGetBudgetResponse=(raw:any):BudgetData=>{
   return {
    userId:raw.userId,
    budget:{
      budgetId:raw.budget._id,
      month:raw.budget.month,
      totalAmount:raw.budget.amount
    },
    category:raw.category.map((cat:any)=>({
      id: cat.id,
      name: cat.name,
      items: Array.isArray(cat.items) ? cat.items : [cat.items],
    }))
   };
};