import { useEffect, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminMonitoringItem from "./AdminMonitoringItem";
import { ServiceContext } from "../../../context/ServiceContext";
import { adminMonitoringAction } from "../../../slices/adminMonitoringSlice";
import EmptyState from "../../../components/EmptyState";
import { useDebounce } from "@uidotdev/usehooks";
import React from "react";

const AdminMonitoringList = () => {
  const dispatch = useDispatch();
  const { adminMonitorings } = useSelector((state) => state.adminMonitoring);
  const { adminMonitoringService } = useContext(ServiceContext);
  const [paging, setPaging] = useState({});

  const [searchParam, setSearchParam] = useSearchParams();
  const [searchState, setSearchState] = useState(
    searchParam.get("search") || ""
  );

  const [searchParamFilter, setSearchParamFilter] = useSearchParams();
  const [searchStateFilter, setSearchStateFilter] = useState({
    startUpdatedAt: searchParamFilter.get("startUpdatedAt") || null,
    endUpdatedAt: searchParamFilter.get("endUpdatedAt") || null,
    activity: searchParamFilter.get("activity") || null,
    adminRole: searchParamFilter.get("adminRole") || null,
  });

  const debounceSearch = useDebounce(searchState, 1000);
  const debounceSearchFilter = useDebounce(searchStateFilter, 300);

  let currentPage = parseInt(searchParam.get("page") || 1);
  let currentSize = parseInt(searchParam.get("size") || 8);

  const clear = () => {
    searchParamFilter.delete("startUpdatedAt");
    searchParamFilter.delete("endUpdatedAt");
    searchParamFilter.delete("activity");
    searchParamFilter.delete("adminRole");
    setSearchParamFilter(searchParamFilter);
    setSearchStateFilter({
      startUpdatedAt: searchParamFilter.get("startUpdatedAt") || null,
      endUpdatedAt: searchParamFilter.get("endUpdatedAt") || null,
      activity: searchParamFilter.get("activity") || null,
      adminRole: searchParamFilter.get("adminRole") || null,
    });
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchState(value);

    if (value.trim() === "") {
      searchParam.delete("search");
      setSearchParam(searchParam);
    }
  };

  const handleChangeFilter = (value, field) => {
    setSearchStateFilter({ ...searchStateFilter, [field]: value });

    if (value.trim() === "") {
      clear();
    }
  };

  const onNext = () => {
    if (currentPage === paging.totalPages) return;
    searchParam.set("page", currentPage + 1);
    setSearchParam(searchParam);
  };

  const onPrevious = () => {
    if (currentPage === 1) return;
    searchParam.set("page", currentPage - 1);
    setSearchParam(searchParam);
  };

  useEffect(() => {
    const onGetAdminMonitorings = () => {
      dispatch(
        adminMonitoringAction(async () => {
          const result = await adminMonitoringService.fetchAdminMonitorings({
            page: currentPage,
            size: currentSize,
            adminName: debounceSearch,
            ...debounceSearchFilter,
          });
          setPaging(result.paging);
          return result;
        })
      );
    };
    onGetAdminMonitorings();
  }, [
    currentPage,
    currentSize,
    dispatch,
    adminMonitoringService,
    debounceSearch,
    debounceSearchFilter,
  ]);

  useEffect(() => {
    if (currentPage < 1 || currentPage > paging.totalPages) {
      searchParam.set("page", 1);
      setSearchParam(searchParam);
    }
  }, [currentPage, paging.totalPages, searchParam, setSearchParam]);

  return (
    <div className="m-4">
      <div className="d-flex">
        <nav aria-label="page navigation example">
          <ul className="pagination d-flex align-items-center mt-3">
            <li key={currentPage} className="page-item">
              <div
                className={`text-black h5 ${
                  paging.totalPages ? "me-2" : "me-3"
                }`}
              >
                {currentPage}/{paging.totalPages}
              </div>
            </li>
            <li
              className={`h2 me-2 text-black cursor-pointer bi bi-arrow-left-circle-fill active-button ${
                currentPage === 1 && "disabled-button"
              }`}
              onClick={() => {
                if (currentPage !== 1) {
                  onPrevious(currentPage);
                }
              }}
            />

            <i
              className={`h2 me-2 text-black cursor-pointer bi bi-arrow-right-circle-fill active-button ${
                currentPage >= paging.totalPages && "disabled-button"
              }`}
              onClick={() => {
                if (currentPage < paging.totalPages) {
                  onNext(currentPage);
                }
              }}
            />
          </ul>
        </nav>
        <div className="container">
          <input
            onChange={handleChange}
            className="form-control h-75 mb-0"
            type="text"
            name="search"
            id="search"
            value={searchState}
            placeholder="Search By Admin Name"
          />
        </div>
        <div className="ms-2 w-auto mt-3">
          <div className="dropdown">
            <button
              className="btn btn-light dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ width: "auto" }}
              onClick={() => clear()}
            >
              Filter By Activty
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {[
                "CREATE_MERCHANT",
                "UPDATE_MERCHANT",
                "DELETE_MERCHANT",
                "CREATE_BRANCH",
                "UPDATE_BRANCH",
                "DELETE_BRANCH",
                "CREATE_PROMOTION",
                "UPDATE_PROMOTION",
                "DELETE_PROMOTION",
              ].map((activity, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <button
                      className="dropdown-item"
                      href="#"
                      onClick={() => handleChangeFilter(activity, "activity")}
                    >
                      <span className="text-capitalize">
                        {activity.toLowerCase().replace(/_/g, " ")}
                      </span>
                    </button>
                    <div className="dropdown-divider"></div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        <div className="ms-2 w-auto mt-3">
          <div className="dropdown">
            <button
              className="btn btn-light dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ width: "auto" }}
              onClick={() => clear()}
            >
              Filter By Admin Role
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {[
                "ROLE_SUPER_ADMIN",
                "ROLE_PARTNERSHIP_HEAD",
                "ROLE_PARTNERSHIP_STAFF",
                "ROLE_MARKETING_HEAD",
                "ROLE_MARKETING_STAFF",
              ].map((adminRole, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <button
                      className="dropdown-item"
                      href="#"
                      onClick={() => handleChangeFilter(adminRole, "adminRole")}
                    >
                      <span className="text-capitalize">
                        {adminRole.toLowerCase().replace(/_/g, " ")}
                      </span>
                    </button>
                    <div className="dropdown-divider"></div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        <div className="ms-2 w-auto mt-3">
          {" "}
          <div className="dropdown show ms-2 w-auto">
            <a
              className="btn btn-light dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              onClick={() => clear()}
            >
              Filter By Updated Date
            </a>

            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <form action="">
                <label htmlFor="startUpdatedAt" className="ms-3">
                  Start Date
                </label>
                <center>
                  <input
                    className="form-control"
                    style={{ width: "90%" }}
                    type="date"
                    name="startUpdatedAt"
                    id="startUpdatedAt"
                    onChange={(e) =>
                      handleChangeFilter(e.target.value, e.target.name)
                    }
                  />
                </center>
                <h6 className="text-center">Month/Day/Year</h6>

                <label htmlFor="endUpdatedAt" className="ms-3">
                  End Date
                </label>
                <center>
                  <input
                    className="form-control"
                    style={{ width: "90%" }}
                    type="date"
                    name="endUpdatedAt"
                    id="endUpdatedAt"
                    onChange={(e) =>
                      handleChangeFilter(e.target.value, e.target.name)
                    }
                  />
                </center>
                <h6 className="text-center">Month/Day/Year</h6>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <h2>Admin Monitoring List</h2>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th className="fw-normal">No</th>
            <th className="fw-normal">ID</th>
            <th className="fw-normal">Activity</th>
            <th className="fw-normal">Admin Name</th>
            <th className="fw-normal">Admin Role</th>
            <th className="fw-normal">Admin ID</th>
            <th className="fw-normal">Admin Email</th>
            <th className="fw-normal">Updated At</th>
            <th className="fw-normal">Action</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {adminMonitorings && adminMonitorings.length !== 0 ? (
            adminMonitorings.map((adminMonitoring, idx) => {
              return (
                <AdminMonitoringItem
                  key={adminMonitoring.adminMonitoringID}
                  adminMonitoring={adminMonitoring}
                  idx={++idx}
                />
              );
            })
          ) : (
            <tr>
              <td colSpan={20}>
                <EmptyState />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default AdminMonitoringList;
