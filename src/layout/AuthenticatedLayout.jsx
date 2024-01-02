import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar"
import Header from "../components/Header";
import Promotion from "../pages/Promotion";
import Merchant from "../pages/Merchant";

function AuthenticatedLayout() {
  return (
    <div className="d-flex">
      {/* <Promotion/> */}
      {/* <Merchant/> */}
      {/* <Header/>
      <Sidebar /> */}
      <main className="flex-grow-1">
        <Outlet />
      </main>
    </div>
  );
}

export default AuthenticatedLayout;
