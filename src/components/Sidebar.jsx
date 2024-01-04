import { NavLink } from "react-router-dom";
import { authAction } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { ServiceContext } from "../context/ServiceContext";

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authService } = useContext(ServiceContext);

  const onLogout = async () => {
    dispatch(
      authAction(async () => {
        await authService.logout();
        navigate("/login");
      })
    );
  };
  return (
    <div className="row">
      <div
        className="d-flex flex-column border custom-border"
        style={{ width: "250px", maxHeight: "100%" }}
      >
        <nav>
          <ul
            className="d-flex flex-column nav-list gap-2 list-unstyled"
            style={{ marginBottom: "0" }}
          >
            <NavLink
              className={({ isActive }) =>
                `text-decoration-none text-black p-3 mt-3 ${
                  isActive ? "fw-bold" : ""
                }`
              }
              to={"/backoffice"}
              end
            >
              <li className="cursor-pointer">
                <i className="bi bi-grid-1x2 me-3"></i>
                <span>Account</span>
              </li>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `text-decoration-none text-black p-3 ${
                  isActive ? "fw-bold" : ""
                }`
              }
              to={"/backoffice/merchants"}
            >
              <li className="cursor-pointer">
                <i className="bi bi-list-ul me-3"></i>
                <span>Merchant</span>
              </li>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `text-decoration-none text-black p-3 ${
                  isActive ? "fw-bold" : ""
                }`
              }
              to={"/backoffice/promotions"}
            >
              <li className="cursor-pointer">
                <i className="bi bi-box-seam me-3"></i>
                <span>Promotion</span>
              </li>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `text-decoration-none text-black p-3 ${
                  isActive ? "fw-bold" : ""
                }`
              }
              to={"/backoffice/histories"}
            >
              <li className="cursor-pointer">
                <i className="bi bi-tag me-3"></i>
                <span>History</span>
              </li>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `text-decoration-none text-black p-3 ${
                  isActive ? "fw-bold" : ""
                }`
              }
              to={"/backoffice/admin-monitoring"}
            >
              <li className="cursor-pointer">
                <i className="bi bi-tag me-3"></i>
                <span>Admin Monitoring</span>
              </li>
            </NavLink>
            <hr />
          </ul>
        </nav>
        <div
          className="cursor-pointer d-flex mt-auto w-100 align-items-center"
          onClick={onLogout}
        >
          <i className="m-2 fs-3 bi bi-box-arrow-right" />
          <span className="m-1">Logout</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
