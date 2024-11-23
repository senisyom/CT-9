import { FormEvent, useState } from "react";
import { ApiCategory } from "../../types";

interface Props {
  onSubmit: (category: ApiCategory) => void;
  existingCategory?: ApiCategory;
  isLoading?: boolean;
}

const FormCategories: React.FC<Props> = ({
  existingCategory,
  onSubmit,
  isLoading = false,
}) => {
  const emptyState = {
    name: "",
    type: "",
  };

  const initialState: ApiCategory = existingCategory
    ? { ...existingCategory }
    : emptyState;

  const [categoryInfo, setCategoryInfo] = useState<ApiCategory>(initialState);

  const changeCategory = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCategoryInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    onSubmit(categoryInfo);
  };

  let title = "Add new Category";

  if (existingCategory) {
    title = "Edit Category";
  }

  return (
    <form onSubmit={onFormSubmit}>
      <div className="container">
        <h3 className="my-3">{title}</h3>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            onChange={changeCategory}
            value={categoryInfo.name}
            name="name"
            placeholder="Category name"
            required
          />
        </div>
        <div className="mb-3">
          <select
            name="type"
            className="form-control"
            onChange={changeCategory}
            defaultValue={categoryInfo.type}
          >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-2"
          disabled={isLoading}
        >
          {existingCategory ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default FormCategories;
