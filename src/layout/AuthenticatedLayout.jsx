import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function AuthenticatedLayout() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthenticatedLayout;
