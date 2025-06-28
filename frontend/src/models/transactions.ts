export interface Transaction{  
  _id?:string;
  itemId?:string;           
  type: string; 
  amount:number;
  date: string;               
  description: string;
}