const Budget = require('../models/Budget');
const BudgetItem = require('../models/BudgetItem');
const BudgetCategory=require('../models/BudgetCategory')

exports.createBudget = async ({ userId, month, totalAmount }) => {
  const existing = await Budget.findOne({ userId, month });
  if (existing) {
    throw new Error('Budget already exists for this month');
  }
  const budget = new Budget({ userId, month, totalAmount });
  return await budget.save();
};

exports.getBudgetByUserAndMonth = async ({ userId, month }) => {
  const budget = await Budget.findOne({ userId, month });
  if (!budget) throw new Error("No Budget fit User");

  // 1. Lấy toàn bộ category của user
  const allCategories = await BudgetCategory.find({ userId });

  // 2. Lấy tất cả item thuộc budget đó
  const items = await BudgetItem.find({ budgetId: budget._id }).populate("categoryId");
  
  // 3. Tạo map category với danh sách rỗng ban đầu
  const categoryMap = new Map();
  allCategories.forEach(category => {
    categoryMap.set(category._id.toString(), {
      id: category._id.toString(),
      name: category.name,
      items: []
    });
  });

  // 4. Gộp các item vào category tương ứng nếu có
  items.forEach(item => {
    const catId = item.categoryId?._id?.toString();
    if (catId && categoryMap.has(catId)) {
      categoryMap.get(catId).items.push({
        itemId: item._id,
        itemName: item.name,
        amount:item.amount,
        date:item.date
      });
    }
  });

  // 5. Trả về danh sách category đã định dạng
  const formattedCategory = Array.from(categoryMap.values());

  return {
    userId: budget.userId,
    budget: {
      _id: budget._id,
      month: budget.month,
      amount: budget.totalAmount
    },
    category: formattedCategory
  };
};

exports.deleteBudget=async ({userId,month})=>{
  const existing=await Budget.findOne({userId})
  if(!existing) throw new Error("Budget not Found")

  await BudgetCategory.deleteMany({userId})
  await Budget.deleteOne({_id:existing._id})
}
