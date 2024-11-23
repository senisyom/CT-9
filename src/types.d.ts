export interface Category {
  name: string;
  type: string;
  id: string;
}

export type ApiCategory = Omit<Category, "id">;

export interface ApiCategories {
  [id: string]: ApiCategory;
}

export interface IncomeExpense {
  category: string;
  amount: number;
  createdAt: string;
  id: string;
}

export type ApiIncomeExpense = Omit<IncomeExpense, "id">;

export interface ApiIncomesExpenses {
  [id: string]: ApiIncomeExpense;
}
