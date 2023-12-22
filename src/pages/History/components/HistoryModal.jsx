import PropTypes from "prop-types";

HistoryModal.propTypes = {
  idx: PropTypes.number,
  orderID: PropTypes.string,
  topUp: PropTypes.object,
  paymentID: PropTypes.string,
};

function HistoryModal({ idx, orderID, topUp, paymentID }) {
  let details = <></>;
  if (orderID != null) {
    const {
      balanceID,
      historyID,
      methodID,
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
          <p>| {methodID}</p>
          <p>| {topUpAmount}</p>
          <p>| {topUpFee}</p>
          <p>| {topUpStatusID}</p>
        </div>
      </div>
    );
  } else if (topUp != null) {
    const {
      balanceID,
      historyID,
      methodID,
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
          <p>| {methodID}</p>
          <p>| {topUpAmount}</p>
          <p>| {topUpFee}</p>
          <p>| {topUpStatusID}</p>
        </div>
      </div>
    );
  } else if (paymentID != null) {
    const {
      balanceID,
      historyID,
      methodID,
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
          <p>| {methodID}</p>
          <p>| {topUpAmount}</p>
          <p>| {topUpFee}</p>
          <p>| {topUpStatusID}</p>
        </div>
      </div>
    );
  }

  return (
    <>
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
    </>
  );
}

export default HistoryModal;
