import PropTypes from "prop-types";
import AdminMonitoringModal from "./AdminMonitoringModal";

AdminMonitoringItem.propTypes = {
  adminMonitoring: PropTypes.any,
  idx: PropTypes.number,
};

function AdminMonitoringItem({ adminMonitoring, idx }) {
  const {
    adminMonitoringID,
    activity,
    adminName,
    adminRole,
    adminID,
    adminEmail,
    updatedAt,
  } = adminMonitoring;

  return (
    <tr style={{ height: '50px' }} className="align-middle">
      <td>{idx}</td>
      <td>{adminMonitoringID}</td>
      <td>{activity}</td>
      <td>{adminName}</td>
      <td>{adminRole}</td>
      <td>{adminID}</td>
      <td>{adminEmail}</td>
      <td>{updatedAt}</td>
      <td>
        <div className="p-2">
          <AdminMonitoringModal
            idx={idx}
			adminMonitoring={adminMonitoring}
          />
          <div className="d-flex flex-column align-items-center justify-content-center pt-2">
            <i
              className="bi bi-list-ul h3 cursor-pointer"
              data-bs-toggle="modal"
              data-bs-target={`#adminMonitoringModal${idx}`}
            ></i>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default AdminMonitoringItem;
