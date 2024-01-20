import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { ServiceContext } from "../../../context/ServiceContext";
import React from "react";

MerchantBranchItem.propTypes = {
  merchantBranch: PropTypes.any,
  setMerchantBranchID: PropTypes.func,
  idx: PropTypes.number,
  merchantBranchAction: PropTypes.any,
  merchantBranchService: PropTypes.any,
  onGetMerchantBranches: PropTypes.func,
  setAction: PropTypes.any,
  action: PropTypes.any,
};

function MerchantBranchItem({
  merchantBranch,
  idx,
  setMerchantBranchID,
  setAction,
}) {
  const { authService } = useContext(ServiceContext);

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

	const fixDate = (date) => {
		let dateLocal = new Date(date);
		let newDate = new Date(
			dateLocal.getTime() - dateLocal.getTimezoneOffset() * 60 * 1000
		);
		const year = newDate.getFullYear();
		const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
		const day = newDate.getDate().toString().padStart(2, '0');
		const hours = newDate.getHours().toString().padStart(2, '0');
		const minutes = newDate.getMinutes().toString().padStart(2, '0');
		const seconds = newDate.getSeconds().toString().padStart(2, '0');
		const miliSeconds = newDate.getMilliseconds().toString().padStart(3, '0');
		const result = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${miliSeconds}`;

		return result;
	};

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
      <td>{city.cityName}</td>
      <td>{picName}</td>
      <td>{picNumber}</td>
      <td>{picEmail}</td>
      <td
        style={{
          color:
            status === "INACTIVE" ? "red" : status === "ACTIVE" ? "green" : "",
        }}
      >
        {status}
      </td>
      <td>{joinDate ? fixDate(joinDate) : ''}</td>
      <td>{fixDate(createdAt)}</td>
      <td className="table-mb visible">
        {status === "INACTIVE" ? (
          ""
        ) : (
          <div className="p-2 row">
            <div className="p-2 d-flex justify-content-between w-100">
              <div className="btn-group justify-content-between">
                {adminRole === "ROLE_PARTNERSHIP_STAFF" &&
                  status === "ACTIVE" && (
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
                {adminRole === "ROLE_PARTNERSHIP_STAFF" &&
                  status === "ACTIVE" && (
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
                  adminRole === "ROLE_PARTNERSHIP_HEAD" && (
                    <div
                      className="dropdown"
                      onClick={setMerchantBranchID(branchID)}
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
                                data-bs-toggle="modal"
                                data-bs-target={`#approveRejectMerchantBranchModal${merchantID}`}
                                onClick={() => {
                                  setAction(action);
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
