import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="row">
      <div className="d-flex flex-column border" style={{ width: "250px", minHeight: "100%" }}>
        <nav>
          <ul className="d-flex flex-column nav-list gap-2 list-unstyled" style={{ marginBottom: "0" }}>
            <NavLink
              className={({ isActive }) =>
                `text-decoration-none text-black p-3 mt-3 ${isActive ? "fw-bold" : ""}`
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
                `text-decoration-none text-black p-3 ${isActive ? "fw-bold" : ""}`
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
                `text-decoration-none text-black p-3 ${isActive ? "fw-bold" : ""}`
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
                `text-decoration-none text-black p-3 ${isActive ? "fw-bold" : ""}`
              }
              to={"/backoffice/histories"}
            >
              <li className="cursor-pointer">
                <i className="bi bi-tag me-3"></i>
                <span>History</span>
              </li>
            </NavLink>
            <hr />
          </ul>
        </nav>
        <div className="mt-auto w-100">
          <div className="d-flex p-4 text-secondary-emphasis">
            <div className="flex-grow-1">Terms & Privacy</div>
            <div className="flex-grow-1">Help</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;