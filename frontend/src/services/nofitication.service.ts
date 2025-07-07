import axios from 'axios'
import {Nofi} from "../models/notifi"

const API_URL='http://localhost:3004/user/'
const token =localStorage.getItem('token')

const NotificationServive={
  async getNotification():Promise<Nofi[]>{
    const response =await axios.get<Nofi[]>(`${API_URL}/notification`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    return response.data;
  },
  async createNotification(data:{title:String,message:String}):Promise<Nofi>{
    const response =await axios.post(`${API_URL}/notification`,{
      title:data.title,
      message:data.message
    },{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    return response.data
  }
}
export default NotificationServive;