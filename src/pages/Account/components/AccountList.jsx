import { useEffect, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AccountItem from "./AccountItem";
import { ServiceContext } from "../../../context/ServiceContext";
import { accountAction } from "../../../slices/accountSlice";

const AccountList = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const dispatch = useDispatch();
  const { accounts } = useSelector((state) => state.account);
  const { accountService } = useContext(ServiceContext);
  const [paging, setPaging] = useState({});

  const currentPage = parseInt(searchParam.get("page") || 1);
  const currentSize = parseInt(searchParam.get("size") || 1);

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
    const onGetAccounts = () => {
      dispatch(
        accountAction(async () => {
          const result = await accountService.fetchAccounts({
            page: currentPage,
            size: currentSize,
          });
          setPaging(result.paging);
          return result;
        })
      );
    };
    onGetAccounts();
  }, [currentPage, currentSize, dispatch, accountService]);

  useEffect(() => {
    if (currentPage < 1 || currentPage > paging.totalPages) {
      searchParam.set("page", 1);
      setSearchParam(searchParam);
    }
  });

  // useEffect(() => {
  //   console.log("currentPage:", currentPage);
  //   console.log("paging.totalPages:", paging.totalPages);
  // }, [currentPage, paging.totalPages]);

  return (
    <div className="m-4">
      {accounts && accounts.length !== 0 && (
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
        <h2>Account List</h2>
      </div>
      <table className="table">
        <thead>
          <tr>
             <th className="fw-normal">No</th>
             <th className="fw-normal">ID</th>
             <th className="fw-normal">NIK</th>
             <th className="fw-normal">First Name</th>
             <th className="fw-normal">Last Name</th>
             <th className="fw-normal">Phone Number</th>
             <th className="fw-normal">Email</th>
             <th className="fw-normal">Birth of Date</th>
             <th className="fw-normal">Created Date</th>
             <th className="fw-normal">Updated Date</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {accounts &&
            accounts.length !== 0 &&
            accounts.map((account, idx) => {
              return (
                <AccountItem
                  key={account.accountID}
                  account={account}
                  idx={++idx}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default AccountList;
