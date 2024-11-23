import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ApiIncomeExpense } from "../../../types";
import { createincomeExpense } from "../../../store/financeThunks";
import { toast } from "react-toastify";
import { selectOneIncomeExpenseCreateLoading } from "../../../store/incomeExpenseSlice";
import FormFinance from "../../../components/Forms/FormFinance";

const FinanceAdd = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isFetching = useAppSelector(selectOneIncomeExpenseCreateLoading);

  const onSubmit = async (finance: ApiIncomeExpense) => {
    try {
      await dispatch(createincomeExpense(finance)).unwrap();
      navigate("/");
      toast.success("Finance Create!");
    } catch {
      toast.error("Could not Create Finance!");
    }
  };

  return (
    <>
      <FormFinance onSubmit={onSubmit} isLoading={isFetching} />
    </>
  );
};

export default FinanceAdd;
