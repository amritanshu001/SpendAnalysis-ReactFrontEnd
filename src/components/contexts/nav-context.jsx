import React, { useState } from "react";

const NavContext = React.createContext({
  isLoggedIn: false,
  loginHandler: () => {},
  logoutHandler: () => {},
  isAdmin: false,
  adminHandler: () => {},
});

export const NavContextProvider = (props) => {
  const [logger, setLogger] = useState(false);
  const [admin, setAdmin] = useState(false);

  const loggedIn = () => {
    setLogger(true);
  };

  const loggedOut = () => {
    setLogger(false);
  };

  const adminSetter = (bool) => {
    setAdmin(bool);
  };

  return (
    <NavContext.Provider
      value={{
        isLoggedIn: logger,
        loginHandler: loggedIn,
        logoutHandler: loggedOut,
        isAdmin: admin,
        adminHandler: adminSetter,
      }}
    >
      {props.children}
    </NavContext.Provider>
  );
};

export default NavContext;
