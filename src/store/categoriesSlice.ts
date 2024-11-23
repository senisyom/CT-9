import { ApiCategory, Category } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import {createCategory, deleteCategory, fetchCategory, fetchOneCategory, updateCategory} from './financeThunks';

interface CategoriesState {
  items: Category[];
  fetchLoading: boolean;
  deleteLoading: boolean;
  updateLoading: boolean;
  oneCategoryLoading: boolean;
  oneCategory: null | ApiCategory;
  createLoading: boolean;
}

  const initialState: CategoriesState = {
    items: [],
    fetchLoading: false,
    deleteLoading: false,
    updateLoading: false,
    oneCategoryLoading: false,
    oneCategory: null,
    createLoading: false,
  };

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchCategory.fulfilled, (state, { payload: items }) => {
        state.fetchLoading = false;
        state.items = items;
      })
      .addCase(fetchCategory.rejected, (state) => {
        state.fetchLoading = false;
      });
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.deleteLoading = false;
      });
    builder
      .addCase(createCategory.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createCategory.rejected, (state) => {
        state.createLoading = false;
      });
    builder
      .addCase(updateCategory.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.updateLoading = false;
      })
      .addCase(updateCategory.rejected, (state) => {
        state.updateLoading = false;
      });
    builder
      .addCase(fetchOneCategory.pending, (state) => {
        state.oneCategory = null;
        state.oneCategoryLoading = true;
      })
      .addCase(fetchOneCategory.fulfilled, (state, { payload: apiCategory }) => {
        state.oneCategory = apiCategory;
        state.oneCategoryLoading = false;
      })
      .addCase(fetchOneCategory.rejected, (state) => {
        state.oneCategoryLoading = false;
      });

  },
  selectors: {
    selectCategories: (state) => state.items,
    selectCategoriesLoading: (state) => state.fetchLoading,
    selectCategoryLoading: (state) => state.oneCategoryLoading,
    selectCategory: (state) => state.oneCategory,
    selectCategoryUpdate: (state) => state.updateLoading,
    selectCategoryCreateLoading: (state) => state.createLoading,
  },
});

export const categoryReducer = categorySlice.reducer;

export const {selectCategories, selectCategoriesLoading, selectCategoryLoading, selectCategory, selectCategoryUpdate, selectCategoryCreateLoading} = categorySlice.selectors;
