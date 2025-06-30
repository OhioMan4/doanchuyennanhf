import axios from "axios";
import { Transaction } from "../models/transactions";
const API_URL='http://localhost:3001/transactions';

const token =localStorage.getItem('token')

const TransactionService={
  async getAllTransaction():Promise<Transaction[]> {
    const response=await axios.get(`${API_URL}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },
  
  async createTransaction(data: Transaction) : Promise<Transaction[]> {
    const  response =await axios.post(API_URL,data,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },
  async deleteTransaction(data:string):Promise<String>{
    const res=await axios.delete(`${API_URL}/action/${data}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
    )
    return res.data;
  }
}
export default TransactionService;