import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Categories from "./containers/Categories/Categories";
import AddCategoty from "./containers/Categories/AddCategory";
import EditCategoty from "./containers/Categories/EditCategoty";
import Finance from "./containers/Finance/Finance/Finance";
import FinanceEdit from "./containers/Finance/Finance/FinanceEdit";
import FinanceAdd from "./containers/Finance/Finance/FinanceAdd";

const App = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Finance />} />
        <Route path="/finance-edit/:id" element={<FinanceEdit />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories-edit/:id" element={<EditCategoty />} />
        <Route path="/categories/add" element={<AddCategoty />} />
        <Route path="/add" element={<FinanceAdd />} />
        <Route path="*" element={<h1>Not found!</h1>} />
      </Routes>
    </>
  );
};

export default App;
