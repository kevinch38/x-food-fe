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
    <tr style={{ height: '50px' }} className="align-middle">
      <td>{idx}</td>
      <td>{adminMonitoringID}</td>
      <td>{activity}</td>
      <td>{adminName}</td>
      <td>{adminRole}</td>
      <td>{adminID}</td>
      <td>{adminEmail}</td>
      <td>{fixDate(updatedAt)}</td>
      <td>
        <div className="p-2">
          <AdminMonitoringModal
            idx={idx}
			adminMonitoring={adminMonitoring}
          />
          <div className="d-flex flex-column align-items-center justify-content-center pt-2">
            <i
              className="bi bi-info-circle-fill h3 cursor-pointer"
              style={{color:"rgb(128, 128, 128)"}}
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
