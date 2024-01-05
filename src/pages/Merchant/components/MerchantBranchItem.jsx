import PropTypes from "prop-types";

MerchantBranchItem.propTypes = {
  merchantBranches: PropTypes.any,
  setMerchantBranchID: PropTypes.func,
  idx: PropTypes.number,
};

function MerchantBranchItem({ merchantBranches, idx, setMerchantBranchID }) {
  const {
    merchantID,
    branchID,
    branchName,
    picEmail,
    picName,
    picNumber,
    city,
    status,
    joinDate,
    createdAt,
  } = merchantBranches;

  return (
    <tr key={idx}>
      <td>{idx}</td>
      <td>{branchID}</td>
      <td>{branchName}</td>
      <td>{city.cityName}</td>
      <td>{picName}</td>
      <td>{picNumber}</td>
      <td>{picEmail}</td>
      <td
        style={{
          color: `${status == "ACTIVE" ? "green" : "red"}`,
        }}
      >
        {status}
      </td>
      <td>{joinDate}</td>
      <td>{createdAt}</td>
      <td>
        {status == "ACTIVE" && (
          <div className="p-2 row">
            <div className="p-2 d-flex justify-content-between w-100">
              <div className="btn-group justify-content-between">
                <i
                  className="bi bi-pencil-fill h3 cursor-pointer m-2"
                  style={{
                    color: "rgb(255, 210, 48)",
                  }}
                  onClick={() => {
                    setMerchantBranchID(branchID);
                  }}
                  data-bs-toggle="modal"
                  data-bs-target={`#createMerchantBranchModal${merchantID}`}
                ></i>
                <i
                  className="bi bi-trash-fill h3 cursor-pointer m-2"
                  style={{
                    color: "rgb(255, 0, 0)",
                  }}
                  onClick={() => {
                    setMerchantBranchID(branchID);
                  }}
                  data-bs-toggle="modal"
                  data-bs-target={`#deleteMerchantBranchModal${merchantID}`}
                ></i>
              </div>
            </div>
          </div>
        )}
      </td>
    </tr>
  );
}

export default MerchantBranchItem;
