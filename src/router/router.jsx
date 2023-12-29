import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Account from "../pages/Account";
import AuthenticatedLayout from "../layout/AuthenticatedLayout";
import AccountList from "../pages/Account/components/AccountList";
import Promotion from "../pages/Promotion";
import Merchant from "../pages/Merchant";

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
              path: "account",
              element: <Account />,
              children: [{ index: true, element: <AccountList /> }],
            },
            {
              path: "promotion",
              element: <Promotion />,
            },
            {
              path: "merchant",
              element: <Merchant />,
            },
          ],
        },
      ],
    },
  ]);

export default setupRouter;
