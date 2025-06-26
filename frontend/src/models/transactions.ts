export interface Transaction{
  userId?: string;               // Có thể không có nếu chưa lưu vào DB
  type: TransactionType; // Chỉ được "income" hoặc "expense"
  amount: number;
  date: string;               // ISO format string
  category: string;
  description: string;
}
export type TransactionType = 'income' | 'expense';