import { Fragment, useEffect } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { logUserOutActions } from "../../store/auth-slice";

const events = [
  "load",
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
];

const AppLogout = (props) => {
  const dispatch = useDispatch();
  let timer;
  const resetTimer = () => {
    if (timer) {
      clearTimeout(timer);
    }
  };
  const handleLogoutTimer = () => {
    timer = setTimeout(() => {
      resetTimer();
      Object.values(events).forEach((event) => {
        window.removeEventListener(event, logoutEvent);
      });
      dispatch(logUserOutActions());
    }, import.meta.env.VITE_TIMEOUT_MS);
  };

  const logoutEvent = () => {
    resetTimer();
    handleLogoutTimer();
  };

  useEffect(() => {
    Object.values(events).forEach((event) => {
      window.addEventListener(event, logoutEvent);
    });
  }, []);
  return <Fragment>{props.children}</Fragment>;
};

export default AppLogout;
