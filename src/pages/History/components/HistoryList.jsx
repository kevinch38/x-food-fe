import { useEffect, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HistoryItem from "./HistoryItem";
import { ServiceContext } from "../../../context/ServiceContext";
import { historyAction } from "../../../slices/historySlice";
import EmptyState from "../../../components/EmptyState";

const HistoryList = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const dispatch = useDispatch();
  const { histories } = useSelector((state) => state.history);
  const { historyService } = useContext(ServiceContext);

  const [paging, setPaging] = useState({});

  let currentPage = parseInt(searchParam.get("page") || 1);
  let currentSize = parseInt(searchParam.get("size") || 9);

  useEffect(() => {
    const onGetHistories = () => {
      dispatch(
        historyAction(async () => {
          const result = await historyService.fetchHistories({
            paging: true,
            page: currentPage,
            size: currentSize,
          });
  
          setPaging(result.paging);
          console.log(result)
          return result;
        })
      );
    };
  
    onGetHistories();
  }, [currentPage, currentSize, dispatch, historyService, searchParam, setSearchParam]);
  
  useEffect(() => {
    if (currentPage < 1 || currentPage > paging.totalPages) {
      searchParam.set("page", 1);
      setSearchParam(searchParam);
    }
  }, [currentPage, paging.totalPages, searchParam, setSearchParam]);
  
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
      {histories && histories.length !== 0 && (
        <div className="d-flex">
          <nav aria-label="page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <div className="page-link text-black">
                  {currentPage}/{paging.totalPages}
                </div>
              </li>
              <li
                className={`page-link text-black cursor-pointer bi bi-arrow-left-circle ${
                  currentPage === 1 && "disabled"
                }`}
                onClick={onPrevious}
              ></li>
              <li
                className={`page-link text-black cursor-pointer bi bi-arrow-right-circle ${
                  currentPage >= paging.totalPages && "disabled"
                }`}
                onClick={onNext}
              ></li>
            </ul>
          </nav>
          <div className="container">
            <input
              className="form-control h-75"
              type="text"
              placeholder="Search..."
            />
          </div>
        </div>
      )}

      {histories && histories.length !== 0 ? (
        <>
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
              {histories.map((history, idx) => (
                <HistoryItem
                  key={history.historyID}
                  history={history}
                  idx={++idx}
                />
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="w-100">
          <EmptyState />
        </div>
      )}
    </div>
  );
};

export default HistoryList;
