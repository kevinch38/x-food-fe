import { useEffect, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MerchantItem from "./MerchantItem";
import { ServiceContext } from "../../../context/ServiceContext";
import { merchantAction } from "../../../slices/merchantSlice";
import CreateMerchantModal from "./CreateMerchantModal";
import EmptyState from "../../../components/EmptyState";
import DeleteMerchantModal from "./DeleteMerchantModal";
import { useDebounce } from "@uidotdev/usehooks";
import React from "react";
import { jwtDecode } from "jwt-decode";

const MerchantList = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const dispatch = useDispatch();
  const { merchants } = useSelector((state) => state.merchant);
  const { merchantService } = useContext(ServiceContext);

  const [paging, setPaging] = useState({});
  const [merchantID, setMerchantID] = useState();

  const { authService } = useContext(ServiceContext);

  const token = authService.getTokenFromStorage();
  if (token) {
    const decodedToken = jwtDecode(token);
    var adminRole = decodedToken.role;
  }

  let currentPage = parseInt(searchParam.get("page") || 1);
  let currentSize = parseInt(searchParam.get("size") || 8);

  const [searchState, setSearchState] = useState(
    searchParam.get("search") || ""
  );
  const debounceSearch = useDebounce(searchState, 1000);

  const [searchParam2, setSearchParam2] = useSearchParams();
  const [searchState2, setSearchState2] = useState({
    merchantStatus: searchParam2.get("merchantStatus") || null,
    startCreatedAt: searchParam2.get("startCreatedAt") || null,
    endCreatedAt: searchParam2.get("endCreatedAt") || null,
    startExpiredDate: searchParam2.get("startExpiredDate") || null,
    endExpiredDate: searchParam2.get("endExpiredDate") || null,
    startJoinDate: searchParam2.get("startJoinDate") || null,
    endJoinDate: searchParam2.get("endJoinDate") || null,
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
    const onGetMerchants = () => {
      dispatch(
        merchantAction(async () => {
          const result = await merchantService.fetchMerchants({
            paging: true,
            page: currentPage,
            size: currentSize,
            merchantName: debounceSearch,
            ...debounceSearch2,
          });
          setPaging(result.paging);
          return result;
        })
      );
    };
    onGetMerchants();
  }, [
    currentPage,
    currentSize,
    debounceSearch,
    debounceSearch2,
    dispatch,
    merchantService,
    merchants?.length,
  ]);

  useEffect(() => {
    searchParam.set("search", debounceSearch);
    setSearchParam(searchParam);
  }, [debounceSearch, searchParam, setSearchParam]);

  // useEffect(() => {
  // 	searchParam2.set('search', debounceSearch2);
  // 	setSearchParam2(searchParam2);
  // }, [debounceSearch2, searchParam2, setSearchParam2]);

  const clear = () => {
    searchParam2.delete("merchantStatus");
    searchParam2.delete("startCreatedAt");
    searchParam2.delete("endCreatedAt");
    searchParam2.delete("startExpiredDate");
    searchParam2.delete("endExpiredDate");
    searchParam2.delete("startJoinDate");
    searchParam2.delete("endJoinDate");
    setSearchParam2(searchParam2);
    setSearchState2({
      merchantStatus: searchParam2.get("merchantStatus") || null,
      startCreatedAt: searchParam2.get("startCreatedAt") || null,
      endCreatedAt: searchParam2.get("endCreatedAt") || null,
      startExpiredDate: searchParam2.get("startExpiredDate") || null,
      endExpiredDate: searchParam2.get("endExpiredDate") || null,
      startJoinDate: searchParam2.get("startJoinDate") || null,
      endJoinDate: searchParam2.get("endJoinDate") || null,
    });
  };
  useEffect(() => {
    if (currentPage < 1 || currentPage > paging.totalPages) {
      searchParam.set("page", 1);
      setSearchParam(searchParam);
    }
  }, [currentPage, paging.totalPages, searchParam, setSearchParam]);

  return (
    <>
      <div className="mx-4 mt-4">
        <div className="d-flex w-100 mt-0 mb-0">
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
          <div className="container mt-1 mb-0">
            <input
              onChange={handleChange}
              className="form-control h-75 mb-0"
              type="text"
              name="search"
              id="search"
              value={searchState}
              placeholder="Search By Merchant Name"
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
                Filter By Status
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                {[
                  "ACTIVE",
                  "INACTIVE",
                  "WAITING_FOR_DELETION_APPROVAL",
                  "WAITING_FOR_CREATION_APPROVAL",
                  "WAITING_FOR_UPDATE_APPROVAL",
                ].map((merchantStatus, idx, array) => {
                  return (
                    <React.Fragment key={++idx}>
                      <button
                        className="dropdown-item"
                        href="#"
                        onClick={() =>
                          handleChange2(merchantStatus, "merchantStatus")
                        }
                      >
                        <span className="text-capitalize">
                          {merchantStatus.toLowerCase().replace(/_/g, " ")}
                        </span>
                      </button>
                      {idx !== array.length - 1 && (
                        <div className="dropdown-divider"></div>
                      )}
                    </React.Fragment>
                  );
                })}
                {/* <button
									className='dropdown-item'
									href='#'
									onClick={() =>
										handleChange2(
											'ACTIVE',
											'merchantStatus'
										)
									}
								>
									Active
								</button>
								<div className='dropdown-divider'></div>
								<button
									className='dropdown-item'
									href='#'
									onClick={() =>
										handleChange2(
											'INACTIVE',
											'merchantStatus'
										)
									}
								>
									Inactive
								</button> */}
              </div>
            </div>
          </div>
          <div className="dropdown show ms-2 w-auto mt-3">
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

                <label htmlFor="endCreatedAt" className="ms-3">
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
          <div className="dropdown show ms-2 w-auto mt-3">
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

                <label htmlFor="startUpdatedAt" className="ms-3">
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
          <div className="dropdown show ms-2 me-4 w-auto mt-3">
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
              Filter By Join Date
            </a>

            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <form action="">
                <label htmlFor="startJoinDate" className="ms-3">
                  Start Date
                </label>
                <center>
                  <input
                    className="form-control"
                    style={{ width: "90%" }}
                    type="date"
                    name="startJoinDate"
                    id="startJoinDate"
                    onChange={(e) =>
                      handleChange2(e.target.value, e.target.name)
                    }
                  />
                </center>
                <h6 className="text-center">Month/Day/Year</h6>

                <label htmlFor="startJoinDate" className="ms-3">
                  End Date
                </label>
                <center>
                  <input
                    className="form-control"
                    style={{ width: "90%" }}
                    type="date"
                    name="endJoinDate"
                    id="endJoinDate"
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

      <div className="mx-4">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Merchant List</h2>
          {adminRole === "ROLE_PARTNERSHIP_STAFF" && (
            <i
              className="bi bi-plus-circle-fill h2 cursor-pointer"
              style={{
                color: "rgb(101, 213, 26)",
              }}
              onClick={() => {
                setMerchantID(null);
                setSearchState("");
              }}
              data-bs-toggle="modal"
              data-bs-target={`#createMerchantModal`}
            ></i>
          )}
        </div>

        <table className="table text-center align-middle">
          <thead>
            <tr>
              <th className="fw-normal">No</th>
              <th className="fw-normal">ID</th>
              <th className="fw-normal">Name</th>
              <th className="fw-normal">PIC Name</th>
              <th className="fw-normal">PIC Number</th>
              <th className="fw-normal">PIC Email</th>
              <th className="fw-normal">Description</th>
              <th className="fw-normal">Status</th>
              <th className="fw-normal">Join Date</th>
              <th className="fw-normal">Created At</th>
              <th className="fw-normal">Updated At</th>
              {(adminRole === "ROLE_PARTNERSHIP_STAFF" ||
                adminRole === "ROLE_PARTNERSHIP_HEAD") && (
                <th className="fw-normal">Action</th>
              )}
              <th style={{ minWidth: "100px" }}></th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {merchants && merchants.length !== 0 ? (
              merchants.map((merchant, idx) => {
                return (
                  <MerchantItem
                    key={merchant.merchantID}
                    merchant={merchant}
                    idx={++idx}
                    setMerchantID={setMerchantID}
                    merchantAction={merchantAction}
                    merchantService={merchantService}
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

        <CreateMerchantModal
          setMerchantID={setMerchantID}
          merchantID={merchantID}
        />
        <DeleteMerchantModal
          setMerchantID={setMerchantID}
          merchantID={merchantID}
        />
      </div>
    </>
  );
};
export default MerchantList;
