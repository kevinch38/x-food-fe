import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Account from "../pages/Account";
import AuthenticatedLayout from "../layout/AuthenticatedLayout";
import Promotion from "../pages/Promotion";
import Merchant from "../pages/Merchant";
import History from "../pages/History";
import AdminMonitoring from "../pages/AdminMonitoring";

const setupRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <>Error...</>,
      children: [
        {
          path: "backoffice",
          element: <AuthenticatedLayout />,
          children: [
            {
              index: true,
              element: <Account />,
            },
            {
              path: "promotions",
              element: <Promotion />,
            },
            {
              path: "merchants",
              element: <Merchant />,
            },
            {
              path: "histories",
              element: <History />,
            },
            {
              path: "admin-monitoring",
              element: <AdminMonitoring />,
            },
            
          ],
        },
      ],
    },
  ]);

export default setupRouter;
