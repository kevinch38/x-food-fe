import { NavLink } from "react-router-dom";
import favicon from "../assets/images/favicon.svg";
import frame from "../assets/images/frame.svg";

function Sidebar() {
  return (
    <>
      <div className={"d-flex justify-content-between p-3 bg-secondary border"}>
        <img src={favicon} alt="favicon-image" />
        <img src={frame} alt="frame-image" />
      </div>

      <div className="row">
        <div className="col-md-2">
          <div
            className={"p-4 bg-secondary border"}
            style={{ minHeight: "100vh" }}
          >
            <nav>
              <ul className="d-flex flex-column gap-3 nav-list list-unstyled">
                <NavLink
                  className={({ isActive }) =>
                    `text-decoration-none text-primary-text ${
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
                    `text-decoration-none text-primary-text ${
                      isActive ? "fw-bold" : ""
                    }`
                  }
                  to={"/backoffice/merchants?page=1&size=10"}
                >
                  <li className="cursor-pointer">
                    <i className="bi bi-list-ul me-3"></i>
                    <span>Merchant</span>
                  </li>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `text-decoration-none text-primary-text ${
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
                    `text-decoration-none text-primary-text ${
                      isActive ? "fw-bold" : ""
                    }`
                  }
                  to={"/backoffice/history"}
                >
                  <li className="cursor-pointer">
                    <i className="bi bi-tag me-3"></i>
                    <span>History</span>
                  </li>
                </NavLink>
                <hr />
                <div className="text-secondary-emphasis">
                  <span className="p-2">Terms & Privacy</span>
                  <span>Help</span>
                </div>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
