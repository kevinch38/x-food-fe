import PropTypes from "prop-types";
import HistoryModal from "./HistoryModal";

HistoryItem.propTypes = {
  history: PropTypes.any,
  idx: PropTypes.number,
};

function HistoryItem({ history, idx }) {
  const {
    historyID,
    transactionType,
    historyValue,
    credit,
    debit,
    accountID,
    updatedAt,
    orderID,
    paymentID,
    topUp,
  } = history;

  return (
    <>
      <tr key={historyID}>
        <td>{idx}</td>
        <td>{historyID}</td>
        <td>{accountID}</td>
        <td>{transactionType}</td>
        <td>{historyValue}</td>
        <td>{debit.toString().toUpperCase()}</td>
        <td>{credit.toString().toUpperCase()}</td>
        <td>{updatedAt}</td>
        <td className=" ms-5">
          <div className="p-2">
            <div className="d-flex flex-column align-items-center justify-content-center pt-2">
              <i
                className="bi bi-list-ul h3 cursor-pointer"
                data-bs-toggle="modal"
                data-bs-target={`#historyModal${idx}`}
              ></i>
            </div>
          </div>
        </td>
      </tr>
      <HistoryModal
        idx={idx}
        orderID={orderID}
        paymentID={paymentID}
        topUp={topUp}
      />
    </>
  );
}

export default HistoryItem;
