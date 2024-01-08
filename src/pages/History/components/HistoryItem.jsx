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
    order,
    payment,
    topUp,
  } = history;

  return (
    <tr key={historyID} className="align-middle">
      <td>{idx}</td>
      <td>{historyID}</td>
      <td>{accountID}</td>
      <td>{transactionType}</td>
      <td>{historyValue}</td>
      <td>{debit.toString().toUpperCase()}</td>
      <td>{credit.toString().toUpperCase()}</td>
      <td>{updatedAt}</td>
      <td>
        <div className="p-2">
          <HistoryModal
            idx={idx}
            order={order}
            payment={payment}
            topUp={topUp}
          />
          <div className="d-flex flex-column align-items-center justify-content-center pt-2">
            <i
              className="bi bi-info-circle-fill h3 cursor-pointer"
              style={{color:"rgb(128, 128, 128)"}}
              data-bs-toggle="modal"
              data-bs-target={`#historyModal${idx}`}
            />
          </div>
        </div>
      </td>
    </tr>
  );
}

export default HistoryItem;
