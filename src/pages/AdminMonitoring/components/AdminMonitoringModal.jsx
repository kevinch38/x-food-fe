import PropTypes from "prop-types";

AdminMonitoringModal.propTypes = {
  idx: PropTypes.number,
  adminMonitoring: PropTypes.object,
  adminMonitoringID: PropTypes.string,
  activity: PropTypes.string,
  // activiyID: PropTypes.string,
  adminName: PropTypes.string,
  adminRole: PropTypes.string,
  adminID: PropTypes.string,
  adminEmail: PropTypes.string,
  // activiyTime: PropTypes.any,
  updatedAt: PropTypes.any,
};

function AdminMonitoringModal({ idx, adminMonitoring }) {
  const {
    adminMonitoringID,
    activity,
    // activityID,
    adminName,
    adminRole,
    adminID,
    adminEmail,
    // activityTime,
    updatedAt
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

  const stringToHex = (str) => {
    let hex = '';
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      const hexValue = charCode.toString(16);
  
      // Pad with zeros to ensure two-digit representation
      hex += hexValue.padStart(2, '0');
    }
    return hex;
  };

  return (
    <>
      <div
        className="modal fade"
        id={`adminMonitoringModal${idx}`}
        tabIndex="-1"
        aria-labelledby={`adminMonitoringModal${idx}`}
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
              Activity Details
            </h1>
            <div
              className="modal-body h-auto mt-5"
              style={{
                textAlign: "left",
              }}
            >
              <div className="d-flex mt-5">
                <div style={{ width: "150px" }}>
                  <p>ID:</p>
                  <p>Activity:</p>
                  <p>Activity ID:</p>
                  <p>Admin Name:</p>
                  <p>Admin Role:</p>
                  <p>Admin ID:</p>
                  <p>Admin Email:</p>
                  <p>Updated At:</p>
                </div>
                <div>
                  <p>| {adminMonitoringID}</p>
                  <p>| {activity}</p>
                  <p>| {stringToHex(activity)}</p>
                  <p>| {adminName}</p>
                  <p>| {adminRole}</p>
                  <p>| {adminID}</p>
                  <p>| {adminEmail}</p>
                  <p>| {fixDate(updatedAt)}</p>
                  {/* <p>| {new Date(activityTime).toLocaleDateString()}</p> */}
                </div>
              </div>
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

export default AdminMonitoringModal;