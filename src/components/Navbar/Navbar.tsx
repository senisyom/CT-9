import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
      <div className="container-sm">
        <NavLink to="/admin">
          <span className="navbar-brand">CT-9 homework </span>
        </NavLink>
        <ul className="navbar-nav mr-auto flex-row gap-2 flex-nowrap">
          <li className="nav-item">
            <NavLink to="/admin/dishes" className="nav-link">
              Test
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin/orders" className="nav-link">
              Test
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
