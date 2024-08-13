import { Link } from "react-router-dom";
import "./Navbar.style.css";
import { useSelector, useDispatch } from "react-redux";
import { accountLogout } from "../../redux/userSlice/userSlice.js";

const Navbar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(accountLogout());
  };
  const { currentUser } = useSelector((state) => state.user);
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
          {currentUser ? (
            <>
              {" "}
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </>
          ) : (
            <>
              {" "}
              <li>
                <Link to="/sign-up">Sign Up</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
