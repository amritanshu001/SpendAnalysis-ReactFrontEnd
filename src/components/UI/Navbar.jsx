import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import { authActions } from "../../store/auth-slice";
import { useHistory } from "react-router-dom";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const redirect = useHistory();
  const isUserLoggedIn = useSelector((state) => state.userAuth.userLoggedIn);
  const isUserAdmin = useSelector((state) => state.userAuth.userIsAdmin);

  const logoutHandler = () => {
    dispatch(authActions.logUserOut());
    redirect.replace("/login");
  };

  // console.log(props.nav);
  return (
    <header className={styles.header}>
      <div>Spend Analysis</div>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {!isUserLoggedIn && (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}
          {isUserLoggedIn && (
            <li>
              <NavLink to="/spendanalysis">Spend Analysis</NavLink>
            </li>
          )}
          {isUserLoggedIn && (
            <li>
              <NavLink to="/manageaccount">Manage Accounts</NavLink>
            </li>
          )}
          {isUserLoggedIn && (
            <li>
              <NavLink to="/uploadstatement">Upload Statement</NavLink>
            </li>
          )}
          {isUserLoggedIn && isUserAdmin && (
            <li>
              <NavLink to="/addbank">Add Bank Details</NavLink>
            </li>
          )}
        </ul>
        {isUserLoggedIn && (
          <Button className={styles.logout} onClick={logoutHandler}>
            Logout
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
