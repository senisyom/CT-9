import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {
  ApiCategories,
  ApiCategory,
  ApiIncomeExpense,
  ApiIncomesExpenses,
  Category,
  IncomeExpense,
} from "../types";

export const fetchCategory = createAsyncThunk<Category[], undefined>(
  "category/fetchCategory",
  async () => {
    const categoryResponse = await axiosApi.get<ApiCategories>(
      "/categories.json"
    );
    const categories: ApiCategories = categoryResponse.data;

    let newCategories: Category[] = [];

    if (categories) {
      newCategories = Object.keys(categories).map((key: string) => {
        const category = categories[key];
        return {
          id: key,
          ...category,
        };
      });
    }

    return newCategories;
  }
);

export const deleteCategory = createAsyncThunk<void, string>(
  "category/deleteCategory",
  async (categoryId) => {
    await axiosApi.delete("/categories/" + categoryId + ".json");
  }
);

export const createCategory = createAsyncThunk<void, ApiCategory>(
  "category/create",
  async (apiCategory) => {
    await axiosApi.post("/categories.json", apiCategory);
  }
);

export const fetchOneCategory = createAsyncThunk<Category, string>(
  "category/fetchOne",
  async (id) => {
    const { data: category } = await axiosApi.get<ApiCategory | null>(
      `/categories/${id}.json`
    );

    if (category === null) {
      throw new Error("Not found");
    }

    const categoryWithId = {
      id: id,
      ...category,
    };

    return categoryWithId;
  }
);

export interface UpdateCategoryArg {
  id: string;
  apiCategory: ApiCategory;
}

export const updateCategory = createAsyncThunk<void, UpdateCategoryArg>(
  "category/update",
  async ({ id, apiCategory }) => {
    await axiosApi.put(`/categories/${id}.json`, apiCategory);
  }
);

export const fetchIncomeExpense = createAsyncThunk<IncomeExpense[], undefined>(
  "incomeExpense/fetchIncomeExpense",
  async () => {
    const incomeExpenseResponse = await axiosApi.get<ApiIncomesExpenses>(
      "/ExpenseIncome.json"
    );
    const incomesExpenses: ApiIncomesExpenses = incomeExpenseResponse.data;

    if (incomesExpenses) {
      return Object.keys(incomesExpenses).map((key: string) => {
        const incomeExpense = incomesExpenses[key];
        return {
          id: key,
          ...incomeExpense,
        };
      });
    }

    return [];
  }
);

export const fetchOneIncomeExpense = createAsyncThunk<IncomeExpense, string>(
  "incomeExpense/fetchOne",
  async (fetchId) => {
    const { data: incomeExpense } = await axiosApi.get<IncomeExpense | null>(
      `/ExpenseIncome/${fetchId}.json`
    );

    if (incomeExpense === null) {
      throw new Error("Not found");
    }

    const incomeExpenseWith = {
      ...incomeExpense,
    };

    return incomeExpenseWith;
  }
);

export const deleteIncomeExpense = createAsyncThunk<void, string>(
  "incomeExpense/deleteIncomeExpense",
  async (expenseIncomeId) => {
    await axiosApi.delete("/ExpenseIncome/" + expenseIncomeId + ".json");
  }
);

export interface UpdateIncomeExpenseArg {
  id: string;
  apiIncomeExpense: ApiIncomeExpense;
}

export const updateIncomeExpense = createAsyncThunk<
  void,
  UpdateIncomeExpenseArg
>("incomeExpense/update", async ({ id, apiIncomeExpense }) => {
  await axiosApi.put(`/ExpenseIncome/${id}.json`, apiIncomeExpense);
});

export const createincomeExpense = createAsyncThunk<void, ApiIncomeExpense>(
  "incomeExpense/create",
  async (incomeExpense) => {
    await axiosApi.post("/ExpenseIncome.json", incomeExpense);
  }
);
