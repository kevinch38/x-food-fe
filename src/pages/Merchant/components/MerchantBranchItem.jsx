import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { ServiceContext } from "../../../context/ServiceContext";
import React from "react";

MerchantBranchItem.propTypes = {
  merchantBranch: PropTypes.any,
  setMerchantBranchID: PropTypes.func,
  idx: PropTypes.number,
  merchantBranchAction: PropTypes.any,
  merchantBranchService: PropTypes.any,
};

function MerchantBranchItem({
  merchantBranch,
  idx,
  setMerchantBranchID,
  merchantBranchAction,
  merchantBranchService,
}) {
  const { authService } = useContext(ServiceContext);
  const { merchantBranches } = useSelector((state) => state.merchantBranch);
  const dispatch = useDispatch();

  const handleApprove = (id) => {
    dispatch(
      merchantBranchAction(async () => {
        await merchantBranchService.approveMerchantBranch(id);
        const data = merchantBranches.filter(
          (merchantBranch) => merchantBranch.branchID !== branchID
        );
        return { messageBox: "Successfully approved", data: data };
      })
    );
  };

  const handleApproveDelete = (id) => {
    dispatch(
      merchantBranchAction(async () => {
        await merchantBranchService.rejectMerchantBranch(id);
        const data = merchantBranches.filter(
          (merchantBranch) => merchantBranch.branchID !== branchID
        );
        return { messageBox: "Successfully approved", data: data };
      })
    );
  };

  const token = authService.getTokenFromStorage();
  if (token) {
    const decodedToken = jwtDecode(token);
    var adminRole = decodedToken.role;
  }

  const {
    merchantID,
    branchID,
    branchName,
    picEmail,
    picName,
    picNumber,
    city,
    status,
    joinDate,
    createdAt,
  } = merchantBranch;

  return (
    <tr
      key={idx}
      style={{
        height: "50px",
      }}
    >
      <td>{idx}</td>
      <td>{branchID}</td>
      <td>{branchName}</td>
      <td className="table-mb">{city.cityName}</td>
      <td className="table-mb">{picName}</td>
      <td className="table-mb">{picNumber}</td>
      <td className="table-mb">{picEmail}</td>
      <td
        className="table-mb"
        style={{
          color:
            status === "ACTIVE"
              ? "green"
              : status === "INACTIVE"
              ? "red"
              : "none",
        }}
      >
        {status}
      </td>
      <td>{joinDate}</td>
      <td>{createdAt}</td>
      <td className="table-mb visible">
        {status == "INACTIVE" ? (
          ""
        ) : (
          <div className="p-2 row">
            <div className="p-2 d-flex justify-content-between w-100">
              <div className="btn-group justify-content-between">
                {(adminRole === "ROLE_SUPER_ADMIN" ||
                  adminRole === "ROLE_PARTNERSHIP_STAFF" ||
                  adminRole === "ROLE_PARTNERSHIP_HEAD") && (
                  <i
                    className="bi bi-pencil-fill h3 cursor-pointer m-2"
                    style={{
                      color: "rgb(255, 210, 48)",
                    }}
                    onClick={() => {
                      setMerchantBranchID(branchID);
                    }}
                    data-bs-toggle="modal"
                    data-bs-target={`#createMerchantBranchModal${merchantID}`}
                  ></i>
                )}
                {(adminRole === "ROLE_SUPER_ADMIN" ||
                  adminRole === "ROLE_PARTNERSHIP_STAFF") && (
                  <i
                    className="bi bi-trash-fill h3 cursor-pointer m-2"
                    style={{
                      color: "rgb(255, 0, 0)",
                    }}
                    onClick={() => {
                      setMerchantBranchID(branchID);
                    }}
                    data-bs-toggle="modal"
                    data-bs-target={`#deleteMerchantBranchModal${merchantID}`}
                  ></i>
                )}

                {status !== "INACTIVE" &&
                  status !== "ACTIVE" &&
                  (adminRole === "ROLE_SUPER_ADMIN" ||
                    adminRole === "ROLE_MARKETING_HEAD") && (
                    <div
                      className="dropdown"
                     
                    >
                     <button
                        className="btn btn-light dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        style={{ width: "auto" }}
                      >
                        <i
                          className="bi bi-list-ul h3 cursor-pointer"
                          style={{ color: "rgb(128, 128, 128)" }}
                        />
                      </button>

                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        {["Approve", "Reject"].map((action, idx, array) => {
                          return (
                            <React.Fragment key={idx}>
                              <button
                                className="dropdown-item"
                                href="#"
                                onClick={() => {
                                  if (
                                    action === "Approve" &&
                                    status === "WAITING_FOR_DELETION_APPROVAL"
                                  )
                                    handleApproveDelete(branchID);
                                  else if (
                                    action === "Approve" &&
                                    (status ===
                                      "WAITING_FOR_CREATION_APPROVAL" ||
                                      status === "WAITING_FOR_UPDATE_APPROVAL")
                                  )
                                    handleApprove(branchID);
                                }}
                              >
                                <span className="text-capitalize">
                                  {action.toLowerCase().replace(/_/g, " ")}
                                </span>
                              </button>
                              {idx !== array.length - 1 && (
                                <div className="dropdown-divider"></div>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}
      </td>
    </tr>
  );
}

export default MerchantBranchItem;
