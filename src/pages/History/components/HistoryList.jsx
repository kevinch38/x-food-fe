import { useEffect, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HistoryItem from "./HistoryItem";
import { ServiceContext } from "../../../context/ServiceContext";
import { historyAction } from "../../../slices/historySlice";
import EmptyState from "../../../components/EmptyState";
import { useDebounce } from "@uidotdev/usehooks";
import React from "react";

const HistoryList = () => {
  const dispatch = useDispatch();
  const { histories } = useSelector((state) => state.history);
  const { historyService } = useContext(ServiceContext);

  const [paging, setPaging] = useState({});

  const [searchParam, setSearchParam] = useSearchParams();
  const [searchState, setSearchState] = useState(
    searchParam.get("search") || ""
  );

  const [searchParamFilter, setSearchParamFilter] = useSearchParams();
  const [searchStateFilter, setSearchStateFilter] = useState({
    startTransactionDate: searchParamFilter.get("startTransactionDate") || null,
    endTransactionDate: searchParamFilter.get("endTransactionDate") || null,
    transactionType: searchParamFilter.get("transactionType") || null,
  });

  const debounceSearch = useDebounce(searchState, 1000);
  const debounceSearchFilter = useDebounce(searchStateFilter, 300);

  let currentPage = parseInt(searchParam.get("page") || 1);
  let currentSize = parseInt(searchParam.get("size") || 8);

  const clear = () => {
    searchParamFilter.delete("startTransactionDate");
    searchParamFilter.delete("endTransactionDate");
    searchParamFilter.delete("transactionType");
    setSearchParamFilter(searchParamFilter);
    setSearchStateFilter({
      startTransactionDate:
        searchParamFilter.get("startTransactionDate") || null,
      endTransactionDate: searchParamFilter.get("endTransactionDate") || null,
      transactionType: searchParamFilter.get("transactionType") || null,
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

  useEffect(() => {
    const onGetHistories = () => {
      dispatch(
        historyAction(async () => {
          const result = await historyService.fetchHistories({
            page: currentPage,
            size: currentSize,
            accountID: debounceSearch,
            ...debounceSearchFilter,
          });

          setPaging(result.paging);
          return result;
        })
      );
    };

    onGetHistories();
  }, [
    currentPage,
    currentSize,
    dispatch,
    historyService,
    searchParam,
    setSearchParam,
    debounceSearch,
    debounceSearchFilter,
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

  const onNext = () => {
    if (currentPage < paging.totalPages) {
      const nextPage = currentPage + 1;
      searchParam.set("page", nextPage);
      setSearchParam(searchParam);
    }
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      searchParam.set("page", prevPage);
      setSearchParam(searchParam);
    }
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
            placeholder="Search By Account ID"
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
              Filter By Transaction Date
            </a>

            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <form action="">
                <label htmlFor="startTransactionDate" className="ms-3">
                  Start Date
                </label>
                <center>
                  <input
                    className="form-control"
                    style={{ width: "90%" }}
                    type="date"
                    name="startTransactionDate"
                    id="startTransactionDate"
                    onChange={(e) =>
                      handleChangeFilter(e.target.value, e.target.name)
                    }
                  />
                </center>
                <h6 className="text-center">Month/Day/Year</h6>

                <label htmlFor="endTransactionDate" className="ms-3">
                  End Date
                </label>
                <center>
                  <input
                    className="form-control"
                    style={{ width: "90%" }}
                    type="date"
                    name="endTransactionDate"
                    id="endTransactionDate"
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
              Filter By Transaction Type
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {["TOP_UP", "PAYMENT", "ORDER"].map((transactionType, idx, array) => {
                return (
                  <React.Fragment key={idx}>
                    <button
                      className="dropdown-item"
                      href="#"
                      onClick={() =>
                        handleChangeFilter(transactionType, "transactionType")
                      }
                    >
                      <span className="text-capitalize">
                        {transactionType.toLowerCase().replace(/_/g, " ")}
                      </span>
                    </button>
                    {idx !== array.length - 1 && <div className="dropdown-divider"></div>}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <h2>History List</h2>
      </div>
      <table className="table text-center">
        <thead>
          <tr>
            <th className="fw-normal">No</th>
            <th className="fw-normal">ID</th>
            <th className="fw-normal">Account</th>
            <th className="fw-normal">Type</th>
            <th className="fw-normal">Value</th>
            <th className="fw-normal">Debit</th>
            <th className="fw-normal">Credit</th>
            <th className="fw-normal">Date Time</th>
            <th className="fw-normal">Action</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {histories && histories.length !== 0 ? (
            histories.map((history, idx) => {
              return (
                <HistoryItem
                  key={history.historyID}
                  history={history}
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

export default HistoryList;
