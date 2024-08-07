import { Link } from "react-router-dom";
import "./Navbar.style.css";

const Navbar = () => {
  return (
    <header>
      <nav className="container nav-container">
        <div className="logo">
          <Link to="/">Logo.</Link>
        </div>
        <ul className="menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/sign-up">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
