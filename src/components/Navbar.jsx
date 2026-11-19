
import { Link, NavLink } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo">
        <span className="logo-icon">☕</span>
        <span>Brew Haven</span>
      </Link>

      <nav className="navbar-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/products/new">Add Product</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
