import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  deleteIncomeExpense,
  fetchIncomeExpense,
} from "../../../store/financeThunks";
import IncomeExpenseItem from "../../../components/Forms/IncomeExpence/IncomeExpenseItem";
import {
  selectIncomesExpenses,
  selectIncomesExpensesLoading,
  selectTotal,
} from "../../../store/incomeExpenseSlice";

const Finance = () => {
  const dispatch = useAppDispatch();
  const incomeExpense = useAppSelector(selectIncomesExpenses);
  const categoriesLoading = useAppSelector(selectIncomesExpensesLoading);

  const total = useAppSelector(selectTotal);

  useEffect(() => {
    dispatch(fetchIncomeExpense());
  }, [dispatch]);

  const onDelete = async (id: string) => {
    await dispatch(deleteIncomeExpense(id));
    await dispatch(fetchIncomeExpense());
  };

  return (
    <>
      <div className="container">
        <div
          className="p-3 rounded-2 border border-1 fs-4 m-4"
          style={{ width: "fit-content" }}
        >
          Total: {total} KGZ 
        </div>
        <div className="list-group">
          {categoriesLoading ? (
            <div/>
          ) : (
            incomeExpense.map((item) => (
               <IncomeExpenseItem
               key={item.id}
               id={item.id}
               category={item.category}
               amount={item.amount}
               createdAt={item.createdAt}
                deleteCategory={() => onDelete(item.id)}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Finance;
