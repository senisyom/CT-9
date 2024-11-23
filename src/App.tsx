import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Finances from "./containers/Finances/Finances";
import Categories from "./containers/Categories/Categories";

const App = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Finances />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </>
  );
};

export default App;
