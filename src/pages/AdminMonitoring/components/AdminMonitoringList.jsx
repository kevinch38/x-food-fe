import { useEffect, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminMonitoringItem from "./AdminMonitoringItem";
import { ServiceContext } from "../../../context/ServiceContext";
import { adminMonitoringAction } from "../../../slices/adminMonitoringSlice";

const AdminMonitoringList = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const dispatch = useDispatch();
  const { adminMonitorings } = useSelector((state) => state.adminMonitoring);
  const { adminMonitoringService } = useContext(ServiceContext);
  const [paging, setPaging] = useState({});

  const currentPage = parseInt(searchParam.get("page") || 1);
  const currentSize = parseInt(searchParam.get("size") || 9);

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
          });
          setPaging(result.paging);
          return result;
        })
      );
    };
    onGetAdminMonitorings();
  }, [currentPage, currentSize, dispatch, adminMonitoringService]);

  useEffect(() => {
    if (currentPage < 1 || currentPage > paging.totalPages) {
      searchParam.set("page", 1);
      setSearchParam(searchParam);
    }
  }, [currentPage, paging.totalPages, searchParam, setSearchParam]);

  return (
    <div className="m-4">
      {adminMonitorings && adminMonitorings.length !== 0 && (
        <div className="d-flex">
          <nav aria-label="page navigation example">
            <ul className="pagination">
              <li key={currentPage} className="page-item">
                <div
                  className={`page-link text-black`}
                  to={`/backoffice/menus?page=${currentPage}&size=${currentSize}`}
                >
                  {currentPage}/{paging.totalPages}
                </div>
              </li>
              <li
                className={`page-link text-black cursor-pointer bi bi-arrow-left-circle ${
                  currentPage == 1 && "disabled"
                }`}
                onClick={() => {
                  onPrevious(currentPage);
                }}
              />

              <li
                className={`page-link text-black cursor-pointer bi bi-arrow-right-circle ${
                  currentPage >= paging.totalPages && "disabled"
                }`}
                onClick={() => {
                  onNext(currentPage);
                }}
              />
            </ul>
          </nav>
          <div className="container">
            <input
              className="form-control h-75 "
              type="text"
              placeholder="Search..."
            />
          </div>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center">
        <h2>Admin Monitoring List</h2>
      </div>
      <table className="table">
        <thead>
          <tr>
             <th className="fw-normal">No</th>
             <th className="fw-normal">ID</th>
             <th className="fw-normal">Activity</th>
             <th className="fw-normal">Activity ID</th>
             <th className="fw-normal">Admin Name</th>
             <th className="fw-normal">Admin Role</th>
             <th className="fw-normal">Admin ID</th>
             <th className="fw-normal">Admin Email</th>
             <th className="fw-normal">Activity Time</th>
             <th className="fw-normal">Action</th>
             
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {adminMonitorings &&
            adminMonitorings.length !== 0 &&
            adminMonitorings.map((adminMonitoring, idx) => {
              return (
                <AdminMonitoringItem
                  key={adminMonitoring.adminMonitoringID}
                  adminMonitoring={adminMonitoring}
                  idx={++idx}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default AdminMonitoringList;
