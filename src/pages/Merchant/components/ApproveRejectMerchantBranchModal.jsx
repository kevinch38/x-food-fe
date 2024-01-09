import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { ServiceContext } from "../../../context/ServiceContext";
import { useContext, useEffect, useState } from "react";
import { merchantAction } from "../../../slices/merchantSlice";

ApproveRejectMerchantBranchModal.propTypes = {
  merchantID: PropTypes.any,
  merchantBranchID: PropTypes.any,
  idx: PropTypes.any,
  onGetMerchantBranches: PropTypes.func,
  action: PropTypes.any,
};

export default function ApproveRejectMerchantBranchModal({
  onGetMerchantBranches,
  merchantID,
  merchantBranchID,
  idx,
  action,
}) {
  const dispatch = useDispatch();
  const [merchantBranch, setMerchantBranch] = useState();
  const { merchantBranchService } = useContext(ServiceContext);
  const { merchantBranches } = useSelector((state) => state.merchantBranch);

  useEffect(() => {
    if (merchantBranchID) {
      const fetchMerchantDetails = async () => {
        try {
          const result =
            await merchantBranchService.fetchMerchantBranchByBranchId(
              merchantBranchID
            );
          setMerchantBranch(result.data);
        } catch (error) {
          console.error("Error fetching merchant details:", error);
        }
      };
      fetchMerchantDetails();
    }
  }, [merchantBranchID, merchantBranchService]);

  const handleApprove = (id) => {
    dispatch(
      merchantAction(async () => {
        await merchantBranchService.approveMerchantBranch(id);

        merchantBranches.filter(
          (merchantBranch) => merchantBranch.branchID !== id
        );
        await onGetMerchantBranches(
          merchantID,
          "Branch Data Successfully Approved"
        );
      })
    );
  };

  const handleApproveInactive = (id) => {
    dispatch(
      merchantAction(async () => {
        await merchantBranchService.approveInactiveMerchantBranch(id);

        merchantBranches.filter(
          (merchantBranch) => merchantBranch.branchID !== id
        );
        await onGetMerchantBranches(
          merchantID,
          "Successfully Approved Delete Branch"
        );
      })
    );
  };

  const handleRejectUpdate = (id) => {
    dispatch(
      merchantAction(async () => {
        await merchantBranchService.rejectUpdateMerchantBranch(id);

        merchantBranches.filter(
          (merchantBranch) => merchantBranch.branchID !== id
        );
        await onGetMerchantBranches(
          merchantID,
          "Successfully Reject Update Branch"
        );
      })
    );
  };

  return (
    <div
      className="modal fade"
      id={`approveRejectMerchantBranchModal${merchantID}`}
      tabIndex="-1"
      aria-labelledby={`approveRejectMerchantBranchModal${merchantID}`}
      aria-hidden="true"
      style={{
        borderRadius: "50px",
        marginTop: "50px",
      }}
      data-backdrop="static"
    >
      <div
        className="modal-dialog rounded-5"
        style={{
          maxWidth: "80vw",
        }}
      >
        <div className="p-4 modal-content border-0">
          <div className="row">
            <div className="d-flex justify-content-center row">
              <span
                id="boot-icon"
                className="bi bi-exclamation-circle text-center"
                style={{
                  fontSize: "4rem",
                }}
              ></span>
              {action === "Reject" ? (
                <h1 className="modal-title fw-bold text-center mt-2">
                  Are You Sure You Want To Reject?
                </h1>
              ) : (
                <h1 className="modal-title fw-bold text-center mt-2">
                  Are You Sure You Want To Approve?
                </h1>
              )}

              <p
                className="modal-title text-center mt-3"
                style={{ color: "grey" }}
              >
                Do you really want to delete these records? This process cannot
                be undone
              </p>
              <div className="justify-content-start text-start d-flex mt-5">
                <div style={{ width: "200px" }}>
                  <p>ID:</p>
                  <p>Merchant ID:</p>
                  <p>Branch:</p>
                  <p>PIC:</p>
                  <p>City:</p>
                  <p>Address:</p>
                  <p>Request Type:</p>
                </div>
                <div>
                  <p>| {merchantBranchID}</p>
                  <p>| {merchantID}</p>
                  <p>| {merchantBranch?.branchName}</p>
                  <p>
                    | {merchantBranch?.picName} - {merchantBranch?.picNumber} (
                    {merchantBranch?.picEmail})
                  </p>
                  <p>| {merchantBranch?.city.cityName}</p>
                  <p>| {merchantBranch?.address}</p>
                  <p>
                    |{" "}
                    {merchantBranch?.status.match(/WAITING_FOR_(\w+)_APPROVAL/)
                      ? merchantBranch?.status.match(
                          /WAITING_FOR_(\w+)_APPROVAL/
                        )[1]
                      : null}
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-around mt-5 w-75 ">
                <button
                  className="btn btn-primary w-25 rounded-pill"
                  style={{
                    color: "white",
                    borderColor: "rgb(217,217,217)",
                    backgroundColor: "rgb(217,217,217)",
                  }}
                  data-bs-toggle="modal"
                  data-bs-target={`#exampleModal${idx}`}
                  aria-label="Close"
                >
                  Cancel
                </button>
                {action === "Reject" ? (
                  <button
                    className="btn btn-danger w-25 rounded-pill"
                    style={{
                      color: "white",
                      borderColor: "rgb(245,5,5)",
                      backgroundColor: "rgb(245,5,5)",
                    }}
                    data-bs-toggle="modal"
                    data-bs-target={`#exampleModal${idx}`}
                    aria-label="Close"
                    onClick={() => {
                      if (
                        merchantBranch?.status ===
                        "WAITING_FOR_DELETION_APPROVAL"
                      ) {
                        handleApprove(merchantBranch?.branchID);
                      } else if (
                        merchantBranch?.status ===
                        "WAITING_FOR_CREATION_APPROVAL"
                      ) {
                        handleApproveInactive(merchantBranch?.branchID);
                      } else if (
                        merchantBranch?.status === "WAITING_FOR_UPDATE_APPROVAL"
                      ) {
                        handleRejectUpdate(merchantBranch?.branchID);
                      }
                    }}
                  >
                    Decline
                  </button>
                ) : (
                  <button
                    className="btn btn-danger w-25 rounded-pill"
                    style={{
                      color: "white",
                      borderColor: "#2BB51F",
                      backgroundColor: "#2BB51F",
                    }}
                    data-bs-toggle="modal"
                    data-bs-target={`#exampleModal${idx}`}
                    aria-label="Close"
                    onClick={() => {
                      if (
                        merchantBranch?.status ===
                        "WAITING_FOR_DELETION_APPROVAL"
                      ) {
                        handleApproveInactive(merchantBranch?.branchID);
                      } else if (
                        merchantBranch?.status ===
                          "WAITING_FOR_CREATION_APPROVAL" ||
                        merchantBranch?.status === "WAITING_FOR_UPDATE_APPROVAL"
                      ) {
                        handleApprove(merchantBranch?.branchID);
                      }
                    }}
                  >
                    Approve
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
