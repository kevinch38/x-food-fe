/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import MerchantBranchItem from "./MerchantBranchItem";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { ServiceContext } from "../../../context/ServiceContext";
import { merchantBranchAction } from "../../../slices/merchantBranchSlice";
import EmptyState from "../../../components/EmptyState";
import CreateMerchantBranchModal from "./CreateMerchantBranchModal";
import { useState } from "react";
import DeleteMerchantBranchModal from "./DeleteMerchantBranchModal";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect } from "react";
import React from "react";

MerchantItem.propTypes = {
  merchant: PropTypes.any,
  setMerchantID: PropTypes.func,
  idx: PropTypes.number,
  onGetMerchantBranches: PropTypes.any,
};

function MerchantItem({ merchant, idx, setMerchantID }) {
  const [merchantBranchID, setMerchantBranchID] = useState();
  const {
    merchantID,
    merchantName,
    picName,
    merchantDescription,
    picNumber,
    picEmail,
    joinDate,
    status,
    note,
    createdAt,
    updatedAt,
  } = merchant;

  const { merchantBranches } = useSelector((state) => state.merchantBranch);
  const { merchantBranchService } = useContext(ServiceContext);
  const dispatch = useDispatch();
  const onGetMerchantBranches = (id, messageBox) => {
    dispatch(
      merchantBranchAction(async () => {
        const result = await merchantBranchService.fetchMerchantBranchById({
          merchantID: id,
          branchName: debounceSearch,
          ...debounceSearch2,
        });
        return { messageBox, ...result };
      })
    );
  };
  // const onGetMerchantBranches2 = (id) => {
  // 	dispatch(
  // 		merchantBranchAction(async () => {
  // 			const result =
  // 				await merchantBranchService.fetchMerchantBranchById(id);
  // 			return result;
  // 		})
  // 	);
  // };
  // merchantName: debounceSearch,

  const [searchParam, setSearchParam] = useSearchParams();

  const [searchState, setSearchState] = useState(
    searchParam.get("searchBranch") || ""
  );
  const debounceSearch = useDebounce(searchState, 1000);

  const [searchParam2, setSearchParam2] = useSearchParams();
  const [searchState2, setSearchState2] = useState({
    status: searchParam2.get("status") || null,
    city: searchParam2.get("city") || null,
    startJoinDate: searchParam2.get("startJoinDate") || null,
    endJoinDate: searchParam2.get("endJoinDate") || null,
  });
  const debounceSearch2 = useDebounce(searchState2, 300);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchState(value);

    if (value.trim() === "") {
      searchParam.delete("searchBranch");
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
    onGetMerchantBranches(merchantID);
  }, [debounceSearch, debounceSearch2]);

  const clear = () => {
    searchParam2.delete("status");
    searchParam2.delete("city");
    searchParam2.delete("startJoinDate");
    searchParam2.delete("endJoinDate");
    setSearchParam2(searchParam2);
    setSearchState2({
      status: searchParam2.get("status") || null,
      city: searchParam2.get("city") || null,
      startJoinDate: searchParam2.get("startJoinDate") || null,
      endJoinDate: searchParam2.get("endJoinDate") || null,
    });
  };

  return (
    <tr key={idx}>
      <td>{idx}</td>
      <td>{merchantID}</td>
      <td>{merchantName}</td>
      <td>{picName}</td>
      <td>{picNumber}</td>
      <td>{picEmail}</td>
      <td>{merchantDescription}</td>
      <td
        style={{
          color: `${status == "ACTIVE" ? "green" : "red"}`,
        }}
      >
        {status}
      </td>
      <td>{joinDate}</td>
      <td>{createdAt}</td>
      <td>{updatedAt}</td>
      <td>
        {status == "ACTIVE" && (
          <div className="p-2 d-flex justify-content-between w-100">
            <div className="btn-group justify-content-between">
              <i
                className="bi bi-pencil-fill h3 cursor-pointer m-2"
                style={{
                  color: "rgb(255, 210, 48)",
                }}
                onClick={() => setMerchantID(merchantID)}
                data-bs-toggle="modal"
                data-bs-target={`#createMerchantModal`}
              ></i>
              <i
                className="bi bi-trash-fill h3 cursor-pointer m-2"
                style={{
                  color: "rgb(255, 0, 0)",
                }}
                onClick={() => setMerchantID(merchantID)}
                data-bs-toggle="modal"
                data-bs-target={`#deleteMerchantModal`}
              ></i>
            </div>
          </div>
        )}
      </td>
      <td className=" ms-5">
        <div className="p-2">
          <div className="d-flex flex-column align-items-center justify-content-center pt-2">
            <i
              className="bi bi-info-circle-fill h3 cursor-pointer"
              style={{ color: "rgb(128, 128, 128)" }}
              onClick={() => onGetMerchantBranches(merchantID)}
              data-bs-toggle="modal"
              data-bs-target={`#exampleModal${idx}`}
            ></i>
          </div>
        </div>
      </td>
      <td>
        <CreateMerchantBranchModal
          onGetMerchantBranches={onGetMerchantBranches}
          setMerchantBranchID={setMerchantBranchID}
          idx={idx}
          merchantID={merchantID}
          merchantBranchID={merchantBranchID}
        />
        <DeleteMerchantBranchModal
          idx={idx}
          merchantID={merchantID}
          merchantBranchID={merchantBranchID}
          onGetMerchantBranches={onGetMerchantBranches}
        />
      </td>
      <td>
        <div
          className="modal fade"
          id={`exampleModal${idx}`}
          tabIndex="-1"
          aria-labelledby={`exampleModal${idx}`}
          aria-hidden="true"
          style={{
            borderRadius: "50px",
            marginTop: "20px",
          }}
        >
          <div
            className="modal-dialog rounded-5"
            style={{
              maxWidth: "90vw",
            }}
          >
            <div className="modal-content border-0">
              <button
                type="button"
                className="btn-close align-self-end m-4"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setSearchState("")}
              ></button>
              <h1 className="modal-title fw-bold text-center">
                Merchant Details
              </h1>
              <div
                className="modal-body h-auto"
                style={{
                  textAlign: "left",
                }}
              >
                <div className="d-flex mt-5">
                  <div style={{ width: "250px" }}>
                    <p>ID:</p>
                    <p>Merchant Name:</p>
                    <p>Description:</p>
                    <p>PIC:</p>
                    <p>Status:</p>
                    <p>Note:</p>
                    <p>Branch(es):</p>
                    <div className="mb-4 mt-5 dropdown">
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
                        ].map((status, idx) => {
                          return (
                            <React.Fragment key={idx}>
                              <button
                                className="dropdown-item"
                                href="#"
                                onClick={() => handleChange2(status, "status")}
                              >
                                <span className="text-capitalize">
                                  {status.toLowerCase().replace(/_/g, " ")}
                                </span>
                              </button>
                              <div className="dropdown-divider"></div>
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </div>
                    <div className="mb-4 dropdown">
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
                        Filter By City
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        {[
                          "Jakarta Pusat",
                          "Jakarta Utara",
                          "Jakarta Timur",
                          "Jakarta Seletan",
                          "Jakarta Barat",
                        ].map((city, idx) => {
                          return (
                            <React.Fragment key={idx}>
                              <button
                                className="dropdown-item"
                                href="#"
                                onClick={() => handleChange2(city, "city")}
                              >
                                {city}
                              </button>
                              <div className="dropdown-divider"></div>
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </div>
                    <div className="mb-4 dropdown ">
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

                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuLink"
                      >
                        <form action="">
                          <label htmlFor="startJoinDate" className="ms-3">
                            Start Date
                          </label>
                          <center>
                            <input
                              className="form-control"
                              style={{
                                width: "90%",
                              }}
                              type="datetime-local"
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
                              style={{
                                width: "90%",
                              }}
                              type="datetime-local"
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

                    <div className="m-0 ps-0" style={{ maxWidth: "80px" }}>
                      <input
                        onChange={handleChange}
                        className="form-control m-0"
                        type="text"
                        name="searchBranch"
                        id="searchBranch"
                        value={searchState}
                        placeholder="Search By Merchant Name"
                        style={{ width: "auto" }}
                      />
                    </div>
                  </div>
                  <div className="w-100">
                    <p>| {merchantID}</p>
                    <p>| {merchantName}</p>
                    <p>| {merchantDescription}</p>
                    <p>| {picName}</p>
                    <p>| {status}</p>
                    <div className="d-flex justify-content-between">
                      <span>| {note}</span>
                      <span className="text-end">
                        {status == "ACTIVE" && (
                          <i
                            className="bi bi-plus-circle-fill h2 cursor-pointer"
                            style={{
                              color: "rgb(101, 213, 26)",
                            }}
                            onClick={() => {
                              setMerchantBranchID(null);
                              setSearchState("");
                            }}
                            data-bs-toggle="modal"
                            data-bs-target={`#createMerchantBranchModal${merchantID}`}
                          ></i>
                        )}
                      </span>
                    </div>

                    {merchantBranches && merchantBranches.length !== 0 ? (
                      <table
                        className="table text-center table-responsive w-100 align-middle"
                        style={{
                          display: "block",
                          maxHeight: "300px",
                          overflowY: "scroll",
                        }}
                      >
                        <thead>
                          <tr>
                            <th scope="col">NO</th>
                            <th scope="col">ID</th>
                            <th scope="col">Branch</th>
                            <th
                              scope="col"
                              style={{
                                minWidth: "200px",
                              }}
                            >
                              City
                            </th>
                            <th
                              scope="col"
                              style={{
                                minWidth: "100px",
                              }}
                            >
                              PIC Name
                            </th>
                            <th
                              scope="col"
                              style={{
                                minWidth: "100px",
                              }}
                            >
                              PIC Number
                            </th>
                            <th
                              scope="col"
                              style={{
                                minWidth: "100px",
                              }}
                            >
                              PIC Email
                            </th>
                            <th scope="col">Status</th>
                            <th scope="col">Join Date</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody className="table-group-divider">
                          {merchantBranches.map((merchantBranches, idx) => {
                            return (
                              <React.Fragment key={idx}>
                                <MerchantBranchItem
                                  key={merchantBranches.merchantbranchID}
                                  merchantBranches={merchantBranches}
                                  idx={++idx}
                                  setMerchantBranchID={setMerchantBranchID}
                                />
                              </React.Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                    ) : (
                      <div className="w-100">
                        <EmptyState />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default MerchantItem;
