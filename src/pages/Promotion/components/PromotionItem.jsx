import PropTypes from "prop-types";

PromotionItem.propTypes = {
  promotion: PropTypes.any,
  idx: PropTypes.number,
  setPromotionID: PropTypes.func,
};

function PromotionItem({ promotion, idx, setPromotionID }) {
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
      <tr key={promotionID}>
        <td className="p-4">{idx}</td>
        <td>{promotionID}</td>
        <td>{merchantName}</td>
        <td>{promotionName}</td>
        <td>{promotionDescription}</td>
        <td>{promotionValue}</td>
        <td
          style={{
            color: `${status == "ACTIVE" ? "green" : "red"}`,
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
              <div className="btn-group d-flex align-items-center justify-content-between">
                <i
                  className="bi bi-pencil-fill h3 cursor-pointer m-2"
                  style={{
                    color: "rgb(255, 210, 48)",
                  }}
                  onClick={() => setPromotionID(promotionID)}
                  data-bs-toggle="modal"
                  data-bs-target={`#createPromotionModal`}
                ></i>
                <i
                  className="bi bi-trash-fill h3 cursor-pointer m-2"
                  style={{
                    color: "rgb(255, 0, 0)",
                  }}
                  onClick={() => setPromotionID(promotionID)}
                  data-bs-toggle="modal"
                  data-bs-target={`#deletePromotionModal`}
                ></i>
              </div>
            </div>
          )}
        </td>
      </tr>
    </>
  );
}

export default PromotionItem;
