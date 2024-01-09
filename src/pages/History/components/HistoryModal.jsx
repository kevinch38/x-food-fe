import PropTypes from "prop-types";

HistoryModal.propTypes = {
  idx: PropTypes.number,
  order: PropTypes.object,
  topUp: PropTypes.object,
  payment: PropTypes.object,
};

function HistoryModal({ idx, order, topUp, payment }) {
  let details = <></>;
  if (order != null) {
    const {
      orderID,
      accountID,
      orderValue,
      notes,
      tableNumber,
      orderStatus,
      branchID,
    } = order;

    details = (
      <div className="d-flex mt-5">
        <div style={{ width: "150px" }}>
          <p>ID:</p>
          <p>Account ID:</p>
          <p>Order Value:</p>
          <p>Notes:</p>
          <p>Table Number:</p>
          <p>Order Status:</p>
          <p>Branch ID:</p>
        </div>
        <div>
          <p>| {orderID}</p>
          <p>| {accountID}</p>
          <p>| {orderValue}</p>
          <p>| {notes}</p>
          <p>| {tableNumber}</p>
          <p>| {orderStatus}</p>
          <p>| {branchID}</p>
        </div>
      </div>
    );
  } else if (topUp != null) {
    const {
      balanceID,
      historyID,
      method,
      topUpAmount,
      topUpFee,
      topUpStatusID,
      updatedAt,
    } = topUp;

    details = (
      <div className="d-flex mt-5">
        <div style={{ width: "150px" }}>
          <p>ID:</p>
          <p>Balance ID:</p>
          <p>Date:</p>
          <p>Method:</p>
          <p>Amount:</p>
          <p>Top Up Fee:</p>
          <p>Top Up Status:</p>
        </div>
        <div>
          <p>| {historyID}</p>
          <p>| {balanceID}</p>
          <p>| {updatedAt}</p>
          <p>| {method}</p>
          <p>| {topUpAmount}</p>
          <p>| {topUpFee}</p>
          <p>| {topUpStatusID}</p>
        </div>
      </div>
    );
  } else if (payment != null) {
    const {
      paymentID,
      accountID,
      paymentAmount,
      paymentType,
      updatedAt,
      expiredAt,
      paymentStatus,
      friendID,
      orderID,
    } = payment;

    details = (
      <div className="d-flex mt-5">
        <div style={{ width: "150px" }}>
          <p>ID:</p>
          <p>Account ID:</p>
          <p>Amount:</p>
          <p>Type:</p>
          <p>Date:</p>
          <p>Expired At:</p>
          <p>Status:</p>
          <p>Friend ID:</p>
          <p>Order ID:</p>
        </div>
        <div>
          <p>| {paymentID}</p>
          <p>| {accountID}</p>
          <p>| {paymentAmount}</p>
          <p>| {paymentType}</p>
          <p>| {updatedAt}</p>
          <p>| {expiredAt}</p>
          <p>| {paymentStatus}</p>
          <p>| {friendID}</p>
          <p>| {orderID}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="modal fade"
      id={`historyModal${idx}`}
      tabIndex="-1"
      aria-labelledby={`historyModal${idx}`}
      aria-hidden="true"
      style={{
        borderRadius: "50px",
        marginTop: "5%",
      }}
    >
      <div
        className="modal-dialog rounded-5"
        style={{
          maxWidth: "90vw",
        }}
      >
        <div className="modal-content border-0">
          <h1 className="modal-title fw-bold text-center mt-5">
            History Details
          </h1>
          <div
            className="modal-body h-auto mt-5"
            style={{
              textAlign: "left",
            }}
          >
            {details}
          </div>
          <button
            type="button"
            className="btn btn-lg align-self-center m-4 text-white rounded-5"
            style={{ background: "#D9D9D9", width: "150px" }}
            data-bs-dismiss="modal"
            tabIndex="-1"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default HistoryModal;
