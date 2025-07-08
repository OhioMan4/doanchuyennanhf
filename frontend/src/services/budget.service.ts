import axios from "axios";
import { Budget, BudgetData, Category, CategoryItem, deleteCategory } from "../models/budget";
import { adapterGetBudgetResponse } from "../adapter/adapter";
const API_URL = import.meta.env.VITE_API_URL_BUDGET
const API_URL_CATE = import.meta.env.VITE_API_URL_CATE
const token = localStorage.getItem('token')


const BudgetService = {
  async getUserBudget(): Promise<BudgetData> {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return adapterGetBudgetResponse(response.data)
  },
  async addUserBudgetMonth(data: Budget): Promise<Budget[]> {
    const response = await axios.post(API_URL, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data
  },
  async deleteCategory(data: deleteCategory): Promise<String> {
    const response = await axios.delete<{ message: String }>(API_URL_CATE + '/delete', {
      data: data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.message;
  },
  async createCategory(data: { budgetId: String, name: String }): Promise<Category> {
    const response = await axios.post(`${API_URL_CATE}/${data.budgetId}`, {
      name: data.name,
      userId: token
    },
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    );
    return response.data
  },
  async createItem(data: { budgetId: String, categoryId: String, name: String, amount: Number, date: String }): Promise<CategoryItem> {
    const res = await axios.post(`${API_URL_CATE}/BudgetItem/${data.categoryId}`, {
      name: data.name,
      budgetId: data.budgetId,
      amount: data.amount,
      date: data.date
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data
  }
}
export default BudgetService;