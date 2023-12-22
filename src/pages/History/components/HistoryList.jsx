import { useEffect, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HistoryItem from "./HistoryItem";
import { ServiceContext } from "../../../context/ServiceContext";
import { historyAction } from "../../../slices/historySlice";
import EmptyState from "../../../components/EmptyState";
import HistoryModal from "./HistoryModal";

const HistoryList = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const dispatch = useDispatch();
  const { histories } = useSelector((state) => state.history);
  const { historyService } = useContext(ServiceContext);

  const [paging, setPaging] = useState({});

  let currentPage = parseInt(searchParam.get("page") || 1);
  let currentSize = parseInt(searchParam.get("size") || 10);

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

  // useEffect(() => {
  // 	currentPage = parseInt(searchParam.get('page') || 1);
  // 	currentSize = parseInt(searchParam.get('size') || 10);
  // }, [paging]);

  useEffect(() => {
    const onGetHistories = () => {
      dispatch(
        historyAction(async () => {
          const result = await historyService.fetchHistories({
            page: currentPage,
            size: currentSize,
          });
          setPaging(result.paging);
          return result;
        })
      );
    };
    onGetHistories();
  }, [currentPage, currentSize, dispatch, historyService, histories.length]);

  useEffect(() => {
    if (currentPage < 1 || currentPage > paging.totalPages) {
      searchParam.set("page", 1);
      setSearchParam(searchParam);
    }
  }, [currentPage, paging.totalPages, searchParam, setSearchParam]);

  return (
    <div
      className="m-4 container-fluid table-responsive"
      style={{ overflowX: "scroll" }}
    >
      <div className="d-flex w-100">
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

      {histories && histories.length !== 0 ? (
        <>
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
              {histories &&
                histories.length !== 0 &&
                histories.map((history, idx) => {
                  return (
                    <HistoryItem
                      key={history.historyID}
                      history={history}
                      idx={++idx}
                    />
                  );
                })}
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
