import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { ServiceContext } from "../../../context/ServiceContext";

PromotionItem.propTypes = {
  promotion: PropTypes.any,
  idx: PropTypes.number,
  setPromotionID: PropTypes.func,
};

function PromotionItem({ promotion, idx, setPromotionID }) {
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
      <tr key={idx} style={{ height: "60px" }}>
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
        <td className="ms-5">
          {status === "ACTIVE" && (
            <div className="d-flex justify-content-between w-100">
              <div className="p-2 btn-group d-flex align-items-center justify-content-between">
                {(adminRole === "ROLE_SUPER_ADMIN" ||
                  adminRole === "ROLE_MARKETING_STAFF" ||
                  adminRole === "ROLE_MARKETING_HEAD") && (
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
                {(adminRole === "ROLE_SUPER_ADMIN" ||
                  adminRole === "ROLE_MARKETING_STAFF") && (
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
              </div>
            </div>
          )}
        </td>
      </tr>
    </>
  );
}

export default PromotionItem;
