import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ApiIncomeExpense } from "../../../types";
import {
  fetchOneIncomeExpense,
  updateIncomeExpense,
} from "../../../store/financeThunks";
import { toast } from "react-toastify";
import { useEffect } from "react";
import FormFinance from "../../../components/Forms/FormFinance";
import {
  selectOneIncomeExpenseCreate,
  selectOneIncomeExpenseCreateLoading,
} from "../../../store/incomeExpenseSlice";

const FinanceEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOneIncomeExpense(id));
  }, [dispatch, id]);
  const isFetching = useAppSelector(selectOneIncomeExpenseCreateLoading);
  const incomeExpense = useAppSelector(selectOneIncomeExpenseCreate);

  const onSubmit = async (finance: ApiIncomeExpense) => {
    try {
      await dispatch(
        updateIncomeExpense({ id, apiIncomeExpense: finance })
      ).unwrap();
      navigate("/");
      toast.success("Finance updated!");
    } catch {
      toast.error("Could not update Finance!");
    }
  };

  return (
    <>
      {incomeExpense && (
        <FormFinance
          onSubmit={onSubmit}
          existingFinance={incomeExpense}
          isLoading={isFetching}
        />
      )}
    </>
  );
};

export default FinanceEdit;
