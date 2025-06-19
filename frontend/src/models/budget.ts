export interface Budget{
  budgetId:String;
  month:  String,
   // YYYY-M
  totalAmount:Number
}
export interface Category{
  userId: String
  name: String,
  budgetId:String,
}
export interface CategoryItem{
  itemId:String,
  itemName:String

}
export interface CategoryData{
  id: String;
    name: String;
    items: CategoryItem[];
}
export interface BudgetData {
  userId:String,
  budget: Budget,
  category: {
    id: String;
    name: String;
    items: CategoryItem[];
  }[];
}
export interface deleteCategory{
  budgetId:String,
  categoryId:String
}
