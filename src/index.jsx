import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";

const ErrorPage = React.lazy(() => import("./components/Pages/ErrorPage"));
import SpinnerCircular from "./components/UI/Feedback/SpinnerCircular";
import { Suspense } from "react";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Suspense fallback={<SpinnerCircular color="success" />}>
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </Suspense>
  </Provider>
);
