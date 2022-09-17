import React from "react";
import ReactDOM from "react-dom/client";
import { NavContextProvider } from "./components/contexts/nav-context";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <NavContextProvider>
    <App />
  </NavContextProvider>
);
