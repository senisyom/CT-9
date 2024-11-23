import { FormEvent, useEffect, useState } from "react";
import { ApiIncomeExpense } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectIncomeExpense } from "../../store/incomeExpenseSlice";
import {
  selectCategories,
  selectCategoriesLoading,
} from "../../store/categoriesSlice";
import { fetchCategory } from "../../store/financeThunks";

interface Props {
  onSubmit: (finance: ApiIncomeExpense) => void;
  existingFinance?: ApiIncomeExpense;
  isLoading?: boolean;
}

const FormFinance: React.FC<Props> = ({
  existingFinance,
  onSubmit,
  isLoading = false,
}) => {
  const emptyState = {
    category: "",
    amount: 0,
    createdAt: new Date().toISOString(),
  };
  const oneCategory = useAppSelector(selectIncomeExpense);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);
  const categories = useAppSelector(selectCategories);
  const categoriesLoading = useAppSelector(selectCategoriesLoading);

  const initialState: ApiIncomeExpense = existingFinance
    ? { ...existingFinance }
    : emptyState;

  const [financeInfo, setFinanceInfo] =
    useState<ApiIncomeExpense>(initialState);

  const changeFinance = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFinanceInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    onSubmit(financeInfo);
  };

  let title = "Add";

  if (existingFinance) {
    title = "Edit";
  }

  return (
    <form onSubmit={onFormSubmit}>
      <div className="container">
        <h3 className="my-3">{title}</h3>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            type="number"
            min="1"
            className="form-control"
            onChange={changeFinance}
            value={financeInfo.amount}
            name="amount"
            placeholder="Amount"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            name="category"
            className="form-control"
            onChange={changeFinance}
            defaultValue={oneCategory[financeInfo.category]?.name}
          >
            {categoriesLoading ? (
              <div />
            ) : (
              categories.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                );
              })
            )}
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-2"
          disabled={isLoading}
        >
          {existingFinance ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
};

export default FormFinance;
