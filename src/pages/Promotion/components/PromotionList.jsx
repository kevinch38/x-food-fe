import { useEffect, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PromotionItem from "./PromotionItem";
import { ServiceContext } from "../../../context/ServiceContext";
import { promotionAction } from "../../../slices/promotionSlice";
import EmptyState from "../../../components/EmptyState";
import CreatePromotionModal from "./CreatePromotionModal";
import DeletePromotionModal from "./DeletePromotionModal";

const PromotionList = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const dispatch = useDispatch();
  const { promotions } = useSelector((state) => state.promotion);
  const { promotionService } = useContext(ServiceContext);
  const [paging, setPaging] = useState({});
  const [promotionID, setPromotionID] = useState();
  

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
    const onGetPromotions = () => {
      dispatch(
        promotionAction(async () => {
          const result = await promotionService.fetchPromotions({
            paging: true,
            page: currentPage,
            size: currentSize,
          });
          setPaging(result.paging);
          return result;
        })
      );
    };
    onGetPromotions();
  }, [currentPage, currentSize, dispatch, promotionService]);

  useEffect(() => {
    if (currentPage < 1 || currentPage > paging.totalPages) {
      searchParam.set("page", 1);
      setSearchParam(searchParam);
    }
  }, [currentPage, paging.totalPages, searchParam, setSearchParam]);

  return (
    <>
      <div className="mt-0 m-4 container-fluid mb-0">
        <div className="d-flex w-100 mt-0 mb-0">
          <nav aria-label="page navigation example">
            <ul className="pagination d-flex align-items-center mt-3">
              <li key={currentPage} className="page-item">
                <div
                  className={`text-black h5 ${
                    paging.totalPages ? `me-2` : ` me-3`
                  }`}
                  to={`/backoffice/promotions?page=${currentPage}&size=${currentSize}`}
                >
                  {currentPage}/{paging.totalPages}
                </div>
              </li>
              <li
                className={`h2 me-2 text-black cursor-pointer bi bi-arrow-left-circle ${
                  currentPage == 1 && "disabled"
                }`}
                onClick={() => {
                  onPrevious(currentPage);
                }}
              />

              <li
                className={`h2 text-black cursor-pointer bi bi-arrow-right-circle ${
                  currentPage >= paging.totalPages && "disabled"
                }`}
                onClick={() => {
                  onNext(currentPage);
                }}
              />
            </ul>
          </nav>
          <div className="container mt-1 mb-0">
            <input
              className="form-control h-75 "
              type="text"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>
      <div
        className="mt-0 m-2 container-fluid table-responsive"
        style={{ overflowX: "scroll" }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h2>Promotion List</h2>
          <i
            className="bi bi-plus-circle-fill h2 cursor-pointer m-2 mt-4"
            style={{
              color: "rgb(101, 213, 26)",
            }}
            onClick={() => setPromotionID(null)}
            data-bs-toggle="modal"
            data-bs-target={`#createPromotionModal`}
          ></i>
        </div>

        {promotions && promotions.length !== 0 ? (
          <>
            <table className="table text-center align-middle">
              <thead>
                <tr>
                  <th className="fw-normal">No</th>
                  <th className="fw-normal">ID</th>
                  <th className="fw-normal">Merchant Name</th>
                  <th className="fw-normal">Name</th>
                  <th className="fw-normal">Description</th>
                  <th className="fw-normal" >Value</th>
                  <th className="fw-normal">Status</th>
                  <th className="fw-normal">Cost</th>
                  <th className="fw-normal">Quantity</th>
                  <th className="fw-normal">Created At</th>
                  <th className="fw-normal">Updated At</th>
                  <th className="fw-normal">Expired Date</th>
                  <th className="fw-normal">Action</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {promotions &&
                  promotions.length !== 0 &&
                  promotions.map((promotion, idx) => {
                    return (
                      <PromotionItem
                        key={promotion.promotionID}
                        promotion={promotion}
                        idx={++idx}
                        setPromotionID={setPromotionID}
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
        <CreatePromotionModal
          setPromotionID={setPromotionID}
          promotionID={promotionID}
        />
        <DeletePromotionModal
          setPromotionID={setPromotionID}
          promotionID={promotionID}
        />
      </div>
    </>
  );
};
export default PromotionList;
