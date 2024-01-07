import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Account from "../pages/Account";
import AuthenticatedLayout from "../layout/AuthenticatedLayout";
import Promotion from "../pages/Promotion";
import Merchant from "../pages/Merchant";
import History from "../pages/History";
import AdminMonitoring from "../pages/AdminMonitoring";
import Login from '../pages/Login';

const setupRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <>Error...</>,
      children: [
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: "backoffice",
          element: <AuthenticatedLayout />,
          children: [
            {
              path: "accounts",
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
