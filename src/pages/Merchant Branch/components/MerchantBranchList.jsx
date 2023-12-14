import { useEffect, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MerchantBranchItem from "./MerchantBranchItem";
import { ServiceContext } from "../../../context/ServiceContext";
import { merchantBranchAction } from "../../../slices/merchantBranchSlice";

const MerchantBranchList = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const dispatch = useDispatch();
  const { merchantbranchs } = useSelector((state) => state.merchantBranch);
  const { merchantBranchService } = useContext(ServiceContext);
  // console.log(merchantBranchService);
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
    const onGetMerchantBranchs = () => {
      dispatch(
        merchantBranchAction(async () => {
          const result = await merchantBranchService.fetchMerchantBranchs({
            page: currentPage,
            size: currentSize,
          });
          setPaging(result.paging);
          return result;
        })
      );
    };
    onGetMerchantBranchs();
  }, [currentPage, currentSize, dispatch, merchantBranchService]);

  useEffect(() => {
    if (currentPage < 1 || currentPage > paging.totalPages) {
      searchParam.set("page", 1);
      setSearchParam(searchParam);
    }
  }, [currentPage, paging.totalPages, searchParam, setSearchParam]);

  return (
    <div className="m-4">
      {merchantbranchs && merchantbranchs.length !== 0 && (
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
        <h2 className="fw-bold">Merchant Branch List</h2>
      </div>
      <table className="table">
        <thead>
          <tr>
             <th className="fw-normal">No</th>
             <th className="fw-normal">ID</th>
             <th className="fw-normal">Branch Name</th>
             <th className="fw-normal">Address</th>
             <th className="fw-normal">Working hours</th>
             <th className="fw-normal">City</th>
             <th className="fw-normal">Timezone</th>
             <th className="fw-normal">Created At</th>
             <th className="fw-normal">Updated At</th>
             <th className="fw-normal">Action</th>
             
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {merchantbranchs &&
            merchantbranchs.length !== 0 &&
            merchantbranchs.map((merchantbranch, idx) => {
              return (
                <MerchantBranchItem
                  key={merchantbranch.merchantbranchID}
                  merchantbranch={merchantbranch}
                  idx={++idx}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default MerchantBranchList;
