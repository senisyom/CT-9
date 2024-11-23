import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import FormCategories from "../../components/Forms/FormCategories";
import { ApiCategory } from "../../types";
import { createCategory } from "../../store/financeThunks";
import { toast } from "react-toastify";
import { selectCategoryCreateLoading } from "../../store/categoriesSlice";

const AddCategoty = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectCategoryCreateLoading);

  const onSubmit = async (apiCategory: ApiCategory) => {
    try {
      await dispatch(createCategory(apiCategory)).unwrap();
      navigate("/categories");
      toast.success("Category created!");
    } catch {
      toast.error("Could not create Category!");
    }
  };

  return (
    <>
      <FormCategories onSubmit={onSubmit} isLoading={isCreating} />
    </>
  );
};

export default AddCategoty;
