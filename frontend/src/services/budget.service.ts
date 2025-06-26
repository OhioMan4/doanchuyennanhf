import axios from "axios";
import {Budget, BudgetData,Category,deleteCategory} from "../models/budget";
import { adapterGetBudgetResponse } from "../adapter/adapter";
const API_URL='http://localhost:3002/api/budget/2025-04'
const API_URL_CATE='http://localhost:3002/api/budgetCategory'
const token =localStorage.getItem('token')

const BudgetService={
  async getUserBudget():Promise<BudgetData>{
    const response= await axios.get(API_URL,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return adapterGetBudgetResponse(response.data)
  },
  async addUserBudgetMonth(data:Budget):Promise<Budget[]>{
    const response=await axios.post(API_URL,data,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return response.data
  },
  async deleteCategory(data:deleteCategory):Promise<String>{
      const response=await axios.delete<{message:String}>(API_URL_CATE+'/delete',{
        data:data,
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.message;
  },
  async createCategory(data:{budgetId:String,name:String}):Promise<Category>{
    const response=await axios.post( `${API_URL_CATE}/${data.budgetId}`,{
        name:data.name,
        userId:token
      },
      {
        headers:{
          Authorization: `Bearer ${token}`
        },
      }
  );
    return response.data
  }
}
export default BudgetService;