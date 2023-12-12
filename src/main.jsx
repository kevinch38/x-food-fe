import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import ServiceProvider from "./context/ServiceContext.jsx";
import { RouterProvider } from 'react-router-dom';
import setupStore from "./store.js";
import ServiceFactory from "./services/ServiceFactory.js";
import setupRouter from './router/router.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./index.scss";

const store = setupStore();
const router = setupRouter();
const service = ServiceFactory();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ServiceProvider service={service}>
        <RouterProvider router={router} />{" "}
      </ServiceProvider>
    </Provider>
  </React.StrictMode>
);
