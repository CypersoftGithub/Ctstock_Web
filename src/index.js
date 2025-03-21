import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import * as serviceWorker from "./serviceWorker";
import { createBrowserHistory } from "history";
import { ToastContainer } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

export const history = createBrowserHistory();
ReactDOM.render(
    <Suspense
      fallback={
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      }
    >
      <BrowserRouter history={history}>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </Suspense>
    ,
  document.getElementById("root")
);

serviceWorker.unregister();