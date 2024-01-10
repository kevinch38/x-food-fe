import { useEffect, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AccountItem from "./AccountItem";
import { ServiceContext } from "../../../context/ServiceContext";
import { accountAction } from "../../../slices/accountSlice";
import { useDebounce } from "@uidotdev/usehooks";
import EmptyState from "../../../components/EmptyState";

const AccountList = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const dispatch = useDispatch();
  const { accounts } = useSelector((state) => state.account);
  const { accountService } = useContext(ServiceContext);
  const [paging, setPaging] = useState({});

  const currentPage = parseInt(searchParam.get("page") || 1);
  const currentSize = parseInt(searchParam.get("size") || 10);

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

  const [searchState, setSearchState] = useState(
    searchParam.get("search") || ""
  );
  const debounceSearch = useDebounce(searchState, 1000);

  const [searchParam2, setSearchParam2] = useSearchParams();
  const [searchState2, setSearchState2] = useState({
    startCreatedAt: searchParam2.get("startCreatedAt") || null,
    endCreatedAt: searchParam2.get("endCreatedAt") || null,
    startUpdatedAt: searchParam2.get("startUpdatedAt") || null,
    endUpdatedAt: searchParam2.get("endUpdatedAt") || null,
  });
  const debounceSearch2 = useDebounce(searchState2, 300);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchState(value);

    if (value.trim() === "") {
      searchParam.delete("search");
      setSearchParam(searchParam);
    }
  };

  const handleChange2 = (value, field) => {
    setSearchState2({ ...searchState2, [field]: value });

    if (value.trim() === "") {
      clear();
    }
  };

  useEffect(() => {
    const onGetAccounts = () => {
      dispatch(
        accountAction(async () => {
          const result = await accountService.fetchAccounts({
            page: currentPage,
            size: currentSize,
            phoneNumber: debounceSearch,
            ...debounceSearch2,
          });
          setPaging(result.paging);
          return result;
        })
      );
    };
    onGetAccounts();
  }, [
    currentPage,
    currentSize,
    dispatch,
    accountService,
    debounceSearch,
    debounceSearch2,
  ]);

  useEffect(() => {
    if (currentPage < 1 || currentPage > paging.totalPages) {
      searchParam.set("page", 1);
      setSearchParam(searchParam);
    }
  }, [currentPage, paging.totalPages, searchParam, setSearchParam]);

  useEffect(() => {
    searchParam.set("search", debounceSearch);
    setSearchParam(searchParam);
  }, [debounceSearch, searchParam, setSearchParam]);

  const clear = () => {
    searchParam2.delete("startCreatedAt");
    searchParam2.delete("endCreatedAt");
    searchParam2.delete("startUpdatedAt");
    searchParam2.delete("endUpdatedAt");
    setSearchParam2(searchParam2);
    setSearchState2({
      startCreatedAt: searchParam2.get("startCreatedAt") || null,
      endCreatedAt: searchParam2.get("endCreatedAt") || null,
      startUpdatedAt: searchParam2.get("startUpdatedAt") || null,
      endUpdatedAt: searchParam2.get("endUpdatedAt") || null,
    });
  };

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
            placeholder="Search By Phone Number"
          />
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
              Filter By Created Date
            </a>

            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <form action="">
                <label htmlFor="startCreatedAt" className="ms-3">
                  Start Date
                </label>
                <center>
                  <input
                    className="form-control"
                    style={{ width: "90%" }}
                    type="date"
                    name="startCreatedAt"
                    id="startCreatedAt"
                    onChange={(e) =>
                      handleChange2(e.target.value, e.target.name)
                    }
                  />
                </center>
                <h6 className="text-center">Month/Day/Year</h6>

                <label htmlFor="startCreatedAt" className="ms-3">
                  End Date
                </label>
                <center>
                  <input
                    className="form-control"
                    style={{ width: "90%" }}
                    type="date"
                    name="endCreatedAt"
                    id="endCreatedAt"
                    onChange={(e) =>
                      handleChange2(e.target.value, e.target.name)
                    }
                  />
                </center>
                <h6 className="text-center">Month/Day/Year</h6>
              </form>
            </div>
          </div>
        </div>

        <div className="ms-2 w-auto mt-3">
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
                      handleChange2(e.target.value, e.target.name)
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
                      handleChange2(e.target.value, e.target.name)
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
        <h2>Account List</h2>
      </div>
      <table className="table text-center">
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
          {accounts && accounts.length !== 0 ? (
            accounts.map((account, idx) => {
              return (
                <AccountItem
                  key={account.accountID}
                  account={account}
                  idx={++idx}
                />
              );
            })
          ) : (
            <tr>
              <td colSpan={10}>
                <EmptyState />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default AccountList;
