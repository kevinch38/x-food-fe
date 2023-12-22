import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Account from "../pages/Account";
import AuthenticatedLayout from "../layout/AuthenticatedLayout";
import AccountList from "../pages/Account/components/AccountList";
import Promotion from "../pages/Promotion";
import Merchant from "../pages/Merchant";
import History from "../pages/History";
import HistoryList from "../pages/History/components/HistoryList";

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
              path: "users",
              element: <Account />,
              children: [{ index: true, element: <AccountList /> }],
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
              children: [{ index: true, element: <HistoryList /> }],
            },
            
          ],
        },
      ],
    },
  ]);

export default setupRouter;
