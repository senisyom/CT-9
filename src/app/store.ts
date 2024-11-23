import { configureStore } from "@reduxjs/toolkit";
import { categoryReducer } from "../store/categoriesSlice";
import { incomeExpenseReducer } from "../store/incomeExpenseSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    incomeExpense: incomeExpenseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
