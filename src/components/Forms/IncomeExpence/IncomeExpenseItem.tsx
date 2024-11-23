import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect, useState } from "react";
import { fetchOneCategory } from "../../../store/financeThunks";
import { selectIncomeExpense } from "../../../store/incomeExpenseSlice";

interface Props {
  amount: number;
  category: string;
  id: string;
  deleteCategory: () => void;
  createdAt: string;
}

const IncomeExpenseItem: React.FC<Props> = ({
  amount,
  category,
  id,
  deleteCategory,
  createdAt,
}) => {
  const dispatch = useAppDispatch();
  const oneCategory = useAppSelector(selectIncomeExpense);
  const [categoryLoaded, setCategoryLoaded] = useState(false);

  useEffect(() => {
    if (category && !categoryLoaded) {
      dispatch(fetchOneCategory(category));
      setCategoryLoaded(true); 
    }
  }, [dispatch, category, categoryLoaded]);

  const categoryData = oneCategory[category];
  let money = null;

  if (categoryData?.type === "Income") {
    money = <div className="text-success">+{amount} KGS</div>;
  } else if (categoryData?.type === "Expense") {
    money = <div className="text-danger">-{amount} KGS</div>;
  }

  const date = new Date(createdAt);

  const addZero = (date: number) => {
    return date < 10 ? `0${date}` : String(date);
  };

  const onDelete = () => {
    deleteCategory();
  };

  if (!categoryData) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="list-group-item d-flex gap-4 align-items-center">
      <div className="d-flex gap-2 align-items-center">
        <span className="fs-7">
          {addZero(date.getHours())}:{addZero(date.getMinutes())}
        </span>
        <span className="fs-7">
          {addZero(date.getDate())}.{addZero(date.getMonth() + 1)}.
          {date.getFullYear()}
        </span>
      </div>
      <div className="fs-4 fw-semibold">{categoryData.name}</div>
      <div className="ms-auto me-5 fs-5 fw-semibold">{money}</div>
      <NavLink to={`/finance-edit/${id}`} className="btn btn-primary">
        Edit
      </NavLink>
      <button onClick={onDelete} className="btn btn-danger">
        Delete
      </button>
    </div>
  );
};

export default IncomeExpenseItem;
