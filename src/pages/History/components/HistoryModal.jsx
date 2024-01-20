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
          <p>| {fixDate(updatedAt)}</p>
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
          <p>| {fixDate(updatedAt)}</p>
          <p>| {fixDate(expiredAt)}</p>
          <p>| {paymentStatus}</p>
          <p>| {friendID}</p>
          <p>| {orderID}</p>
        </div>
      </div>
    );
  }

  
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
