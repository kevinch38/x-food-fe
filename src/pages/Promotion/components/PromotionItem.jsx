import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { ServiceContext } from "../../../context/ServiceContext";
import React from "react";

PromotionItem.propTypes = {
  promotion: PropTypes.any,
  idx: PropTypes.number,
  setPromotionID: PropTypes.func,
  onGetPromotions: PropTypes.func,
  setAction: PropTypes.any,
};

function PromotionItem({ promotion, idx, setPromotionID, setAction }) {
  const { authService } = useContext(ServiceContext);
  const token = authService.getTokenFromStorage();
  if (token) {
    const decodedToken = jwtDecode(token);
    var adminRole = decodedToken.role;
  }

  const {
    promotionID,
    merchantName,
    cost,
    promotionValue,
    promotionName,
    promotionDescription,
    quantity,
    expiredDate,
    status,
    createdAt,
    updatedAt,
  } = promotion;

  return (
    <>
      <td>{idx}</td>
      <td>{promotionID}</td>
      <td>{merchantName}</td>
      <td>{promotionName}</td>
      <td>{promotionDescription}</td>
      <td>{promotionValue}</td>
      <td
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
      <td>{cost}</td>
      <td>{quantity}</td>
      <td>{createdAt}</td>
      <td>{updatedAt}</td>
      <td>{expiredDate}</td>
      <td className="ms-5 visible">
        {status !== "INACTIVE" && (
          <div className="d-flex justify-content-between w-100">
            <div className="p-2 btn-group d-flex align-items-center justify-content-between">
              {adminRole === "ROLE_MARKETING_STAFF" && (
                <i
                  className="bi bi-pencil-fill h3 cursor-pointer m-2"
                  style={{
                    color: "rgb(255, 210, 48)",
                  }}
                  onClick={() => setPromotionID(promotionID)}
                  data-bs-toggle="modal"
                  data-bs-target={`#createPromotionModal`}
                ></i>
              )}
              {adminRole === "ROLE_MARKETING_STAFF" && (
                <i
                  className="bi bi-trash-fill h3 cursor-pointer m-2"
                  style={{
                    color: "rgb(255, 0, 0)",
                  }}
                  onClick={() => setPromotionID(promotionID)}
                  data-bs-toggle="modal"
                  data-bs-target={`#deletePromotionModal`}
                ></i>
              )}
              {status !== "INACTIVE" &&
                status !== "ACTIVE" &&
                (adminRole === "ROLE_SUPER_ADMIN" ||
                  adminRole === "ROLE_MARKETING_HEAD") && (
                  <div className="dropdown">
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
                              data-bs-target={`#approveRejectPromotionModal${promotionID}`}
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
        )}
      </td>
    </>
  );
}

export default PromotionItem;
