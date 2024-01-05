import { useEffect, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PromotionItem from "./PromotionItem";
import { ServiceContext } from "../../../context/ServiceContext";
import { promotionAction } from "../../../slices/promotionSlice";
import { useDebounce } from "@uidotdev/usehooks";
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
  const currentSize = parseInt(searchParam.get("size") || 10);
  const [searchState, setSearchState] = useState(
    searchParam.get("search") || ""
  );
  const debounceSearch = useDebounce(searchState, 1000);

  const [searchParam2, setSearchParam2] = useSearchParams();
  const [searchState2, setSearchState2] = useState({
    promotionStatus: searchParam2.get("promotionStatus") || null,
    startCreatedAt: searchParam2.get("startCreatedAt") || null,
    endCreatedAt: searchParam2.get("endCreatedAt") || null,
    startUpdatedAt: searchParam2.get("startUpdatedAt") || null,
    endUpdatedAt: searchParam2.get("endUpdatedAt") || null,
    startExpiredDate: searchParam2.get("startExpiredDate") || null,
    endExpiredDate: searchParam2.get("endExpiredDate") || null,
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
            page: currentPage,
            size: currentSize,
            promotionName: debounceSearch,
            ...debounceSearch2,
          });
          setPaging(result.paging);
          return result;
        })
      );
    };
    onGetPromotions();
  }, [
    currentPage,
    currentSize,
    debounceSearch,
    debounceSearch2,
    dispatch,
    promotionService,
  ]);

  useEffect(() => {
    searchParam.set("search", debounceSearch);
    setSearchParam(searchParam);
  }, [debounceSearch, searchParam, setSearchParam]);

  const clear = () => {
    searchParam2.delete("promotionStatus");
    searchParam2.delete("startCreatedAt");
    searchParam2.delete("endCreatedAt");
    searchParam2.delete("startUpdatedAt");
    searchParam2.delete("endUpdatedAt");
    searchParam2.delete("startExpiredDate");
    searchParam2.delete("endExpiredDate");
    setSearchParam2(searchParam2);
    setSearchState2({
      promotionStatus: searchParam2.get("promotionStatus") || null,
      startCreatedAt: searchParam2.get("startCreatedAt") || null,
      endCreatedAt: searchParam2.get("endCreatedAt") || null,
      startUpdatedAt: searchParam2.get("startUpdatedAt") || null,
      endUpdatedAt: searchParam2.get("endUpdatedAt") || null,
      endExpiredDate: searchParam2.get("endExpiredDate") || null,
      startExpiredDate: searchParam2.get("startExpiredDate") || null,
    });
  };

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
          <ul className="pagination d-flex ">
            <li key={currentPage} className="page-item">
              <a
                className={`page-link text-black`}
                to={`/backoffice/promotions?page=${currentPage}&size=${currentSize}`}
              >
                {currentPage}/{paging.totalPages}
              </a>
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
        <div className="container mt-1 mb-0">
          <input
            onChange={handleChange}
            className="form-control h-75 mb-0"
            type="text"
            name="search"
            id="search"
            value={searchState}
            placeholder="Search By Promotion Name"
          />
        </div>
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
            Filter By Status
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {[
              "ACTIVE",
              "INACTIVE",
              "WAITING_FOR_DELETION_APPROVAL",
              "WAITING_FOR_CREATION_APPROVAL",
              "WAITING_FOR_UPDATE_APPROVAL",
            ].map((promotionStatus) => {
              return (
                <>
                  <button
                    className="dropdown-item"
                    href="#"
                    onClick={() =>
                      handleChange2(promotionStatus, "promotionStatus")
                    }
                  >
                    <span className="text-capitalize">
                      {promotionStatus.toLowerCase().replace(/_/g, " ")}
                    </span>
                  </button>
                  <div className="dropdown-divider"></div>
                </>
              );
            })}
          </div>
        </div>
        <div className="dropdown show ms-2 w-auto mt-0">
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
                  type="datetime-local"
                  name="startCreatedAt"
                  id="startCreatedAt"
                  onChange={(e) => handleChange2(e.target.value, e.target.name)}
                />
              </center>
              <h6 className="text-center">Month/Day/Year</h6>

              <label htmlFor="endCreatedAt" className="ms-3">
                End Date
              </label>
              <center>
                <input
                  className="form-control"
                  style={{ width: "90%" }}
                  type="datetime-local"
                  name="endCreatedAt"
                  id="endCreatedAt"
                  onChange={(e) => handleChange2(e.target.value, e.target.name)}
                />
              </center>
              <h6 className="text-center">Month/Day/Year</h6>
            </form>
          </div>
        </div>
        <div className="dropdown show ms-2 w-auto mt-0">
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
                  type="datetime-local"
                  name="startUpdatedAt"
                  id="startUpdatedAt"
                  onChange={(e) => handleChange2(e.target.value, e.target.name)}
                />
              </center>
              <h6 className="text-center">Month/Day/Year</h6>

              <label htmlFor="startUpdatedAt" className="ms-3">
                End Date
              </label>
              <center>
                <input
                  className="form-control"
                  style={{ width: "90%" }}
                  type="datetime-local"
                  name="endUpdatedAt"
                  id="endUpdatedAt"
                  onChange={(e) => handleChange2(e.target.value, e.target.name)}
                />
              </center>
              <h6 className="text-center">Month/Day/Year</h6>
            </form>
          </div>
        </div>
        <div className="dropdown show ms-2 me-4 w-auto mt-0">
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
            Filter By Expired Date
          </a>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <form action="">
            <label htmlFor="startExpiredDate" className="ms-3">
                Start Date
              </label>
              <center>
                <input
                  className="form-control"
                  style={{ width: "90%" }}
                  type="datetime-local"
                  name="startExpiredDate"
                  id="startExpiredDate"
                  onChange={(e) => handleChange2(e.target.value, e.target.name)}
                />
              </center>
              <h6 className="text-center">Month/Day/Year</h6>
              <label htmlFor="endExpiredDate" className="ms-3">
                End Date
              </label>
              <center>
                <input
                  className="form-control"
                  style={{ width: "90%" }}
                  type="datetime-local"
                  name="endExpiredDate"
                  id="endExpiredDate"
                  onChange={(e) => handleChange2(e.target.value, e.target.name)}
                />
              </center>
              <h6 className="text-center">Month/Day/Year</h6>
            </form>
          </div>
        </div>
      </div>
      <div className="mx-4">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Promotion List</h2>
          <i
            className="bi bi-plus-circle-fill h2 cursor-pointer m-2 mt-4"
            style={{
              color: "rgb(101, 213, 26)",
            }}
            onClick={() => {
              setPromotionID(null);
              setSearchState("");
            }}
            data-bs-toggle="modal"
            data-bs-target={`#createPromotionModal`}
          ></i>
        </div>

        {promotions && promotions.length !== 0 ? (
          <>
            <table className="table text-center align-middle">
              <thead>
                <tr className="align-middle">
                  <th className="fw-normal">No</th>
                  <th className="fw-normal">ID</th>
                  <th className="fw-normal">Merchant Name</th>
                  <th className="fw-normal">Name</th>
                  <th className="fw-normal">Description</th>
                  <th className="fw-normal">Value</th>
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
    </div>
  );
};
export default PromotionList;
